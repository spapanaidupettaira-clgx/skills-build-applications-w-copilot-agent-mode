import express from 'express';
import './config/database.js';
import { Activity, User } from './models/index.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.get('/api/users', async (_request, response) => {
    try {
        const users = await User.find();
        response.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.get('/api/activities', async (_request, response) => {
    try {
        const activities = await Activity.find();
        response.json(activities);
    }
    catch (error) {
        console.error('Error fetching activities:', error);
        response.status(500).json({ error: 'Failed to fetch activities' });
    }
});
app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
