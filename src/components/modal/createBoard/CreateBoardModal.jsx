import styles from "./createboardmodal.module.css";
import { useState } from "react";
import { useBoards } from "@contexts/BoardContext";

export default function CreateBoardModal({ onClose, handleRefresh }) {
  const { createNewBoard } = useBoards();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateBoard = async () => {
    try {
      if (!name || !description) {
        setError("Name and description is required.");
        return;
      }
      await createNewBoard(name, description);
      handleRefresh();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <h3>Create new board</h3>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Board Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
          <button
            type="button"
            onClick={handleCreateBoard}
            className={styles.button}
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
