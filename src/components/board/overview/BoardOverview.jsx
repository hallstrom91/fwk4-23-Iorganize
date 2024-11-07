import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoards } from "@contexts/BoardContext";
import styles from "./boardoverview.module.css";

export default function BoardOverview() {
  const navigate = useNavigate();
  const { fetchAllUserBoards } = useBoards();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await fetchAllUserBoards();
        setBoards(data);
      } catch (error) {
        throw error;
      }
    };

    fetchBoards();
  }, []);

  const handleBoardSelect = (boardId) => {
    navigate(`/myboards/${boardId}`);
  };

  return (
    <>
      <div className={styles.boardContainer}>
        {boards.map((board) => (
          <div
            className={styles.boardCard}
            key={board.id}
            onClick={() => handleBoardSelect(board.id)}
          >
            <h4 className={styles.boardTitle}>{board.name}</h4>
            <p className={styles.boardDescription}>{board.description}</p>
            {/*           <p>{board.created_at}</p>
            <p>{board.created_by}</p>
            <p>{board.role}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}
