import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL_AUTH = import.meta.env.VITE_API_URL_AUTH;
  const API_URL_DOMAIN = import.meta.env.VITE_API_URL_DOMAIN;

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL_AUTH}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setIsAuthenticated(false);
        throw new Error("Inloggning misslyckad");
      }
      console.info("login data", data);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const register = async (fullname, email, password) => {
    try {
      const response = await fetch(`${API_URL_AUTH}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Registrering misslyckad");
      }
      console.info("register data", data);
    } catch (error) {
      throw error;
    }
  };

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_URL_AUTH}/auth/verifyjwt`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setIsAuthenticated(false);
        return null;
      }
      setIsAuthenticated(true);
      setUserData(data.message);
      return data.message;
    } catch (error) {
      console.error("Failed verification", error);
      setIsAuthenticated(false);
    }
  };

  const checkCookieConsent = async () => {
    try {
      const response = await fetch(`${API_URL_DOMAIN}/cookie/check`, {
        method: "GET",
        headers: {
          "Content-Type": "applicaton/json",
        },
      });
      if (!response.ok) {
        throw new Error("Misslyckades att kontrollera cookie samtycke");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const acceptCookieConsent = async () => {
    try {
      const response = await fetch(`${API_URL_DOMAIN}/cookie/accept`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      if (!response.ok) {
        throw new Error("Samtycke kunde inte sparas.");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const declineCookieConsent = async () => {
    try {
      const response = await fetch(`${API_URL_DOMAIN}/cookie/decline`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      if (!response.ok) {
        throw new Error(" Samtycke kunde inte sparas");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    login,
    register,
    checkCookieConsent,
    acceptCookieConsent,
    declineCookieConsent,
    isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
