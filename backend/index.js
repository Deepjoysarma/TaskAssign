import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/database.js';

import agentRoute from './routes/AgentRoute.js';
import adminRoute from './routes/AdminRoute.js';

const app = express();
dotenv.config();
connectDB();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/agents', agentRoute);
app.use('/api/admin', adminRoute);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});