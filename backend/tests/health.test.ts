import request from 'supertest';
import app from '../src/server';

describe('Health Check', () => {
  it('should return status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});

describe('Tasks API', () => {
  it('should return empty tasks array initially', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test task'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
  });
});
