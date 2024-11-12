import { useState, useEffect } from "react";
import styles from "./createtaskmodal.module.css";
import { useTasks } from "@contexts/TaskContext";

export default function CreateTaskModal({ boardId, onClose, handleRefresh }) {
  const { createNewTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = async () => {
    try {
      if (!title) {
        setError("Title is required");
        return;
      }
      await createNewTask(boardId, title, description);
      handleRefresh();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <h3>Create Task</h3>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
          <input
            type="text"
            placeholder="Assign to (UserId)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleCreateTask} className={styles.button}>
            Create Task
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
