import { Routes, Route } from "react-router-dom";
import Login from "@login/Login";
import Register from "@register/Register";

export default function PublicRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
