import express from 'express';
import { agentLogin, agentRegister, getAgent, getAllAgents, markTaskCompleted } from '../controllers/AgentController.js';

const router = express.Router();

router.post('/register', agentRegister);
router.post('/login', agentLogin);
router.get('/all', getAllAgents);
router.get('/:id', getAgent);
router.post('/:id/tasks/:taskIndex', markTaskCompleted);

export default router;