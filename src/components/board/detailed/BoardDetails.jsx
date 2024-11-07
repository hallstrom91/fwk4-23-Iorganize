import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./boarddetails.module.css";
import { useBoards } from "@contexts/BoardContext";

export default function BoardDetails() {
  const { boardId } = useParams();
  const { fetchBoardWithTasks } = useBoards();
  const [boardData, setBoardData] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const data = await fetchBoardWithTasks(boardId);
        console.log("data", data);
        setBoardData(data.board);
        setTasks(data.tasks);
      } catch (error) {
        console.error("fail to open board...", error);
      }
    };
    if (boardId) {
      fetchBoardDetails();
    }
  }, [boardId]);

  return (
    <div className={styles.boardDetailsContainer}>
      <h1 className={styles.boardHeader}>{boardData.name}</h1>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
