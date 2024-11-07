import { createContext, useContext, useState, useEffect } from "react";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const API_URL_DOMAIN = import.meta.env.VITE_API_URL_DOMAIN;
  const [boards, setBoards] = useState([]);

  const fetchAllUserBoards = async () => {
    try {
      const response = await fetch(`${API_URL_DOMAIN}/board/my-boards`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("board data", data);
      if (!response.ok) {
        throw new Error("Inhämtning av dina bord misslyckades.");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchBoardWithTasks = async (boardId) => {
    try {
      const response = await fetch(`${API_URL_DOMAIN}/board/${boardId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Inhämtning av bord misslyckades.");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const value = { fetchAllUserBoards, fetchBoardWithTasks };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export const useBoards = () => {
  return useContext(BoardContext);
};
