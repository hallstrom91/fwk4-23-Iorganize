import { createContext, useContext } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const API_URL_DOMAIN = import.meta.env.VITE_API_URL_DOMAIN;

  const createNewTask = async (boardId, title, description) => {
    // add logic for assignedTo and function to display members in board to select from
    try {
      const response = await fetch(`${API_URL_DOMAIN}/task/create/${boardId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = response.json();
      if (!response.ok) {
        throw new Error("Failed to create new task");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchTaskDetails = async (boardId, taskId) => {
    try {
      const response = await fetch(
        `${API_URL_DOMAIN}/task/${boardId}/open/${taskId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = response.json();
      if (!response.ok) {
        throw new Error("Failed to open task");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateTask = async (taskId, boardId, status) => {
    const response = await fetch(`${API_URL_DOMAIN}/task/update/${taskId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  };

  const deleteTask = async (taskId, boardId) => {
    const response = await fetch(`${API_URL_DOMAIN}/task/delete/${taskId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return await response.json();
  };

  const updateComment = async (commentId, commentText) => {
    const response = await fetch(`${API_URL_DOMAIN}/task/update/${commentId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: commentText }),
    });
    if (!response.ok) throw new Error("Failed to update comment");
    return await response.json();
  };

  const deleteComment = async (commentId) => {
    const response = await fetch(`${API_URL_DOMAIN}/task/delete/${commentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to delete comment");
    return await response.json();
  };

  const value = {
    createNewTask,
    fetchTaskDetails,
    updateTask,
    deleteTask,
    updateComment,
    deleteComment,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  return useContext(TaskContext);
};
