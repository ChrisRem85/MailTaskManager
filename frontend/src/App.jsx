import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/tasks`)
      setTasks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tasks. Is the backend running?')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (e) => {
    e.preventDefault()
    if (!newTask.title || !newTask.description) {
      alert('Please fill in all fields')
      return
    }

    try {
      await axios.post(`${API_URL}/api/tasks`, newTask)
      setNewTask({ title: '', description: '' })
      setShowForm(false)
      fetchTasks()
    } catch (err) {
      alert('Failed to create task')
      console.error('Error creating task:', err)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${taskId}`, { status: newStatus })
      fetchTasks()
    } catch (err) {
      alert('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      await axios.delete(`${API_URL}/api/tasks/${taskId}`)
      fetchTasks()
    } catch (err) {
      alert('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444'
      case 'medium': return '#ffaa00'
      case 'low': return '#44ff44'
      default: return '#888'
    }
  }

  if (loading) {
    return <div className="container"><h1>Loading tasks...</h1></div>
  }

  return (
    <div className="container">
      <header>
        <h1>📧 MailTaskManager</h1>
        <p>Manage your email-based tasks efficiently</p>
      </header>

      <div className="actions">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
        <button onClick={fetchTasks} className="btn-secondary">
          🔄 Refresh
        </button>
      </div>

      {showForm && (
        <form onSubmit={createTask} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            rows="4"
          />
          <button type="submit" className="btn-primary">Create Task</button>
        </form>
      )}

      {error && <div className="error">{error}</div>}

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <span className="task-status">Status: {task.status}</span>
                <span className="task-date">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  className="status-select"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
