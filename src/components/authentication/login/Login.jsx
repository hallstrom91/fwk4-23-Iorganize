import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import styles from "./login.module.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);

      navigate("/myboards");
    } catch (error) {
      console.error("Inloggning misslyckades", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="button" onClick={handleLogin}>
          Logga In
        </button>
      </div>
    </>
  );
}
