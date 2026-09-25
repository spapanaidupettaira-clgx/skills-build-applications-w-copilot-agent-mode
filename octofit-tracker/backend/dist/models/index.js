import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    level: { type: Number, required: true, min: 1 },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
const leaderboardEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
