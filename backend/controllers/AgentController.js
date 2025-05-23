import Agent from '../models/Agent.model.js';
import jwt from 'jsonwebtoken';

const agentRegister = async(req, res) => {

    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({success:false, message:'All fields are required'});
        }

        const existingAgent = await Agent.findOne({ email });

        if(existingAgent) {
            return res.status(409).json({success:false, message:'Email already registered, Please login'});
        }

        const newAgent = new Agent({
            username,
            email,
            password,
            tasks:[]
        });

        await newAgent.save();

        const agent = await Agent.findOne({ email });

        const token = jwt.sign(
          { agentId: agent._id, email: agent.email },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        const agentId = agent._id;

        res.status(201).json({success:true, message:'Agent registered successfully', token, agentId});
    } catch (error) {
        res.status(500).json({success:false, message:'Error in agentRegister', error});
    }
}

const agentLogin = async(req, res) => {
    
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({success:false, message:'All fields are required'});
        }

        const agent = await Agent.findOne({ email });

        if(!agent) {
            return res.status(409).json({success:false, message:'No account exist, Please register'});
        }

        if(password !== agent.password) {
            return res.status(401).json({success:false, message:'Invalid credentials'});
        }

        const token = jwt.sign(
          { agentId: agent._id, email: agent.email },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        const agentId = agent._id;

        res.status(201).json({success:true, message:'Login successfully', token, agentId});
    } catch (error) {
        res.status(500).json({success:false, message:'Error in agentLogin', error});
    }
}

const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.json({ success: true, agents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch agents', error });
  }
};

const addTask = async (req, res) => {
  try {
    const { agentId, title, description } = req.body;

    if (!agentId || !title || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    const newTask = { title, description, completed: false };
    agent.tasks.push(newTask);

    await agent.save();

    res.status(200).json({ success: true, message: 'Task added successfully', agent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding task', error });
  }
};

const getAgent = async(req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}

const markTaskCompleted = async (req, res) => {
  const { id, taskIndex } = req.params;

  try {
    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    if (!agent.tasks[taskIndex]) {
      return res.status(400).json({ success: false, message: 'Task not found' });
    }

    agent.tasks[taskIndex].completed = true;
    await agent.save();

    res.json({ success: true, message: 'Task marked as complete' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating task', error });
  }
};

export { agentRegister, agentLogin, getAllAgents, addTask, getAgent, markTaskCompleted };