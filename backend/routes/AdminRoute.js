import express from 'express';
import { adminLogin } from '../controllers/AdminController.js';
import { addTask } from '../controllers/AgentController.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/add-agent-task', addTask);

export default router;