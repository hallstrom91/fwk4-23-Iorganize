import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoards } from "@contexts/BoardContext";
import styles from "./boardoverview.module.css";
import CreateBoardModal from "@modal/createBoard/CreateBoardModal";

export default function BoardOverview() {
  const navigate = useNavigate();
  const { fetchAllUserBoards } = useBoards();
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBoards = async () => {
    try {
      const data = await fetchAllUserBoards();
      setBoards(data);
    } catch (error) {
      throw error;
    }
  };

  const handleRefreshBoards = () => {
    fetchBoards();
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardSelect = (boardId) => {
    navigate(`/myboards/${boardId}`);
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <button
          className={styles.createBoardButton}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Board
        </button>
        {isModalOpen && (
          <CreateBoardModal
            onClose={() => setIsModalOpen(false)}
            handleRefresh={handleRefreshBoards}
          />
        )}
      </div>
      <div className={styles.boardContainer}>
        <div>
          {boards.map((board) => (
            <div
              className={styles.boardCard}
              key={board.id}
              onClick={() => handleBoardSelect(board.id)}
            >
              <h4 className={styles.boardTitle}>{board.name}</h4>
              <p className={styles.boardDescription}>{board.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
