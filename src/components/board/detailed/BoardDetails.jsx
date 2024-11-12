import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./boarddetails.module.css";
import { useBoards } from "@contexts/BoardContext";
import CreateTaskModal from "@modal/createTask/CreateTaskModal";
import OpenTaskModal from "@modal/openTask/OpenTaskModal";
import CheckMarkIcon from "@svg/CheckMarkIcon";

export default function BoardDetails() {
  const { boardId } = useParams();
  const { fetchBoardWithTasks } = useBoards();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isOpenTaskModalOpen, setIsOpenTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [boardData, setBoardData] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  const handleRefreshBoardDetails = () => {
    fetchBoardDetails();
    setIsCreateTaskModalOpen(false);
  };

  const handleOpenTask = (taskId) => {
    setSelectedTaskId(taskId);
    setIsOpenTaskModalOpen(true);
  };

  useEffect(() => {
    if (boardId) {
      fetchBoardDetails();
    }
  }, []);

  return (
    <>
      <div className={styles.btnContainer}>
        <button
          className={styles.createTaskButton}
          type="button"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Create New Task
        </button>
        {isCreateTaskModalOpen && (
          <CreateTaskModal
            boardId={boardId}
            onClose={() => setIsCreateTaskModalOpen(false)}
            handleRefresh={handleRefreshBoardDetails}
          />
        )}
      </div>
      <div className={styles.boardDetailsContainer}>
        <div>
          <h1 className={styles.boardHeader}>{boardData.name}</h1>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={styles.taskItem}
                onClick={() => handleOpenTask(task.id)}
              >
                {task.title}
                {task.status === "done" && <CheckMarkIcon />}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpenTaskModalOpen && selectedTaskId && (
        <OpenTaskModal
          boardId={boardId}
          taskId={selectedTaskId}
          onClose={() => setIsOpenTaskModalOpen(false)}
        />
      )}
    </>
  );
}
