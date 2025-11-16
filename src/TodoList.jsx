import React, { useState, useEffect } from "react";
import "./assets/bootstrap.min.css";
import "./to-do-list.css"

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  // For editing modal
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  // Error messages
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // ---------------- LocalStorage ----------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dashboardTasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
  }, [tasks]);

  // ------- Handlers ---------
  const addTask = () => {
    if (!newTask.trim()) {
      setError("Task title is required!");
      return;
    }
    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: newTask,
      desc,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newEntry]);
    setNewTask("");
    setDesc("");
    setDueDate("");
    setError(""); // clear error after success
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDesc(task.desc);
    setEditDueDate(task.dueDate);
    setEditError("");
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      setEditError("Task title is required!");
      return;
    }
    if (!editDueDate) {
      setEditError("Please select a due date.");
      return;
    }

    setTasks(tasks.map((t) =>
      t.id === editingTask.id
        ? { ...t, title: editTitle, desc: editDesc, dueDate: editDueDate }
        : t
    ));
    setEditingTask(null);
  };

  // Helper for overdue
  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date(today);
  };

  // ------------- design/UI -------------
  return (
    <div className="dashboard-container container py-4">
      <h2 className="text-center fw-bold mb-4">To-do List</h2>

      {/* Add Task */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">Add Task</h5>
        <div className="d-flex mb-3 gap-2">
          <input
            type="text"
            placeholder="Task title"
            className="form-control"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-label="Task title"
            required
          />
          <button className="btn btn-primary fw-bold" onClick={addTask}>
            Add
          </button>
        </div>

        <textarea
          className="form-control mb-2"
          placeholder="Task description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          aria-label="Task description"
        />

        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          min={today}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Due date"
          required
        />

        {/* Inline Error Alert */}
        {error && (
          <div className="alert alert-danger py-2 my-2">{error}</div>
        )}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </li>
      </ul>

      {/* Task List */}
      <div className="card shadow-sm p-3">
        <ul className="list-group">
          {(activeTab === "pending"
            ? tasks.filter((t) => !t.completed)
            : tasks.filter((t) => t.completed)
          ).map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm"
              style={{ transition: "all 0.3s ease" }}
            >
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  aria-label="Mark task as completed"
                />
                <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </strong>
                <p className="mb-1 text-muted small">{task.desc}</p>
                {task.dueDate && (
                  <span
                    className={`badge ${
                      task.completed
                        ? "bg-success"
                        : isOverdue(task)
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {task.completed
                      ? "Completed"
                      : isOverdue(task)
                      ? `Overdue: ${task.dueDate}`
                      : `Due: ${task.dueDate}`}
                  </span>
                )}
              </div>
              <div className="d-flex gap-2">
                {!task.completed && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => startEdit(task)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          {(activeTab === "pending"
            ? tasks.filter((t) => !t.completed).length === 0
            : tasks.filter((t) => t.completed).length === 0) && (
            <p className="text-muted small text-center mt-3">
              No {activeTab} tasks
            </p>
          )}
        </ul>
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editTaskModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingTask(null)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
                <textarea
                  className="form-control mb-2"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  value={editDueDate}
                  min={today}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  required
                />
                {/* Inline Error for Edit */}
                {editError && (
                  <div className="alert alert-danger py-2 my-2">{editError}</div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={saveEdit}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
