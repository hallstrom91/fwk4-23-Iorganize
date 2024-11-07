import { Routes, Route } from "react-router-dom";
import BoardOverview from "@board/overview/BoardOverview";
import BoardDetails from "@board/detailed/BoardDetails";
import { BoardProvider } from "@contexts/BoardContext";

export default function PrivateRoutes() {
  return (
    <>
      <BoardProvider>
        <Routes>
          <Route path="/myboards" element={<BoardOverview />} />
          <Route path="/myboards/:boardId" element={<BoardDetails />} />
        </Routes>
      </BoardProvider>
    </>
  );
}
