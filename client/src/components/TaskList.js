import React, { useState } from 'react';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [updating, setUpdating] = useState(null);

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdating(taskId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const updatedTask = await res.json();
        onTaskUpdated(updatedTask);
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        onTaskDeleted(taskId);
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'badge-priority-high';
      case 'medium': return 'badge-priority-medium';
      case 'low': return 'badge-priority-low';
      default: return 'badge-priority-medium';
    }
  };

  const getStatusClass = (status) => {
    return status === 'completed' ? 'badge-status-completed' : 'badge-status-pending';
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Create your first task above to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <div key={task._id} className="task-card">
          <div className="task-header">
            <div style={{ flex: 1 }}>
              <h3 className="task-title" style={{
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                opacity: task.status === 'completed' ? 0.6 : 1
              }}>
                {task.title}
              </h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
            </div>
          </div>

          <div className="task-meta">
            <span className={`task-badge ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`task-badge ${getStatusClass(task.status)}`}>
              {task.status}
            </span>
          </div>

          <div className="task-actions">
            {task.status !== 'completed' ? (
              <button
                onClick={() => handleStatusChange(task._id, 'completed')}
                className="btn btn-success btn-sm"
                disabled={updating === task._id}
              >
                {updating === task._id ? 'Updating...' : 'Complete'}
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange(task._id, 'pending')}
                className="btn btn-info btn-sm"
                disabled={updating === task._id}
              >
                {updating === task._id ? 'Updating...' : 'Reopen'}
              </button>
            )}

            <button
              onClick={() => handleDelete(task._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;