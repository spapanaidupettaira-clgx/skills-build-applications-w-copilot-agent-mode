import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            { name: 'Alex Rivera', email: 'alex.rivera@mergington.edu', avatar: 'AR', level: 7 },
            { name: 'Jordan Kim', email: 'jordan.kim@mergington.edu', avatar: 'JK', level: 5 },
            { name: 'Taylor Morgan', email: 'taylor.morgan@mergington.edu', avatar: 'TM', level: 6 },
        ]);
        const teams = await Team.insertMany([
            { name: 'Mountain Movers', color: '#e76f51', members: [users[0]._id, users[1]._id] },
            { name: 'Trail Blazers', color: '#2a9d8f', members: [users[2]._id] },
        ]);
        const activities = await Activity.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'Running',
                durationMinutes: 35,
                points: 120,
                completedAt: new Date('2026-09-22T16:30:00Z'),
            },
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'Strength training',
                durationMinutes: 28,
                points: 95,
                completedAt: new Date('2026-09-24T16:30:00Z'),
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                type: 'Walking',
                durationMinutes: 45,
                points: 90,
                completedAt: new Date('2026-09-23T15:45:00Z'),
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                type: 'Cycling',
                durationMinutes: 40,
                points: 110,
                completedAt: new Date('2026-09-21T17:00:00Z'),
            },
        ]);
        const pointsByUser = new Map();
        for (const activity of activities) {
            const userId = activity.user.toString();
            pointsByUser.set(userId, (pointsByUser.get(userId) || 0) + activity.points);
        }
        const rankedUsers = [...users].sort((firstUser, secondUser) => (pointsByUser.get(secondUser._id.toString()) || 0) -
            (pointsByUser.get(firstUser._id.toString()) || 0));
        await LeaderboardEntry.insertMany(rankedUsers.map((user, index) => {
            const team = teams.find((candidateTeam) => candidateTeam.members.some((member) => member.toString() === user._id.toString()));
            return {
                user: user._id,
                team: team?._id,
                points: pointsByUser.get(user._id.toString()) || 0,
                rank: index + 1,
            };
        }));
        await Workout.insertMany([
            {
                title: 'Quick Cardio Burst',
                category: 'Cardio',
                difficulty: 'Beginner',
                durationMinutes: 20,
                description: 'A short interval routine to build endurance between classes.',
            },
            {
                title: 'Core Builder',
                category: 'Strength',
                difficulty: 'Intermediate',
                durationMinutes: 25,
                description: 'A balanced bodyweight session focused on stability and control.',
            },
            {
                title: 'Recovery Flow',
                category: 'Mobility',
                difficulty: 'Beginner',
                durationMinutes: 15,
                description: 'Gentle mobility work for recovery after an active day.',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
