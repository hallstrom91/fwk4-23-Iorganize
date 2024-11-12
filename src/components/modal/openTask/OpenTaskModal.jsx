import { useEffect, useState } from "react";
import styles from "./opentaskmodal.module.css";
import { useTasks } from "@contexts/TaskContext";

export default function OpenTaskModal({ boardId, taskId, onClose }) {
  const {
    fetchTaskDetails,
    updateTask,
    deleteTask,
    updateComment,
    deleteComment,
  } = useTasks();
  const [taskDetails, setTaskDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("undone");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleOpenTask = async () => {
    try {
      const data = await fetchTaskDetails(boardId, taskId);
      setTaskDetails(data.task);
      setComments(data.comments);
      setUpdatedDescription(data.task.description);
      setAssignedTo(data.task.assigned_to);
      setStatus(data.task.status);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateStatus = async () => {
    const markAsDone = "done";
    try {
      await updateTask(taskId, boardId, markAsDone);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (boardId || taskId) {
      handleOpenTask();
    }
  }, []);

  return (
    <>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          {error && <p className={styles.error}>{error}</p>}
          {taskDetails ? (
            <>
              <h3>{taskDetails.title}</h3>
              <p>{taskDetails.description}</p>
              <p>Status: {taskDetails.status}</p>
              <button type="button" onClick={() => handleUpdateStatus()}>
                Mark as Done
              </button>
              <h3>Comments</h3>
              <ul className={styles.commentList}>
                {comments.map((comment) => (
                  <li key={comment.id} className={styles.commentItem}>
                    {comment.comment}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading task details...</p>
          )}
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
