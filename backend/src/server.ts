import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://ml-service:8000';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage (stub - replace with database later)
interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
}

let tasks: Task[] = [];
let taskIdCounter = 1;

// Health Check Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Get all tasks
app.get('/api/tasks', (_req: Request, res: Response) => {
  res.status(200).json(tasks);
});

// Get task by ID
app.get('/api/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  return res.status(200).json(task);
});

// Create new task
app.post('/api/tasks', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  // Call ML service for classification (optional, falls back to default if unavailable)
  let priority = 'medium';
  try {
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, {
      text: `${title} ${description}`
    });
    priority = mlResponse.data.priority || 'medium';
  } catch (error) {
    console.warn('ML service unavailable, using default priority');
  }

  const newTask: Task = {
    id: String(taskIdCounter++),
    title,
    description,
    priority,
    status: 'open',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...req.body,
    id: tasks[taskIndex].id, // Prevent ID modification
    createdAt: tasks[taskIndex].createdAt // Prevent createdAt modification
  };

  tasks[taskIndex] = updatedTask;
  return res.status(200).json(updatedTask);
});

// Delete task
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  return res.status(204).send();
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

export default app;
