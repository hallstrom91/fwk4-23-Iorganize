import { useAuth } from "@contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Layout from "@publicLayout/PublicLayout";
import PrivateRoutes from "@routes/PrivateRoutes";
import PublicRoutes from "@routes/PublicRoutes";
import PublicLayout from "@publicLayout/PublicLayout";
import PrivateLayout from "@privateLayout/PrivateLayout";
import "./App.css";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <Routes>
            <Route
              path="/*"
              element={
                <PrivateLayout>
                  <PrivateRoutes />
                </PrivateLayout>
              }
            />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/*"
              element={
                <PublicLayout>
                  <PublicRoutes />
                </PublicLayout>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}
