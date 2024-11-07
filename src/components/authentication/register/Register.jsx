import { useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import styles from "./register.module.css";

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleRegister = async () => {
    try {
      await register(fullname, email, password);
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
        <input
          className={styles.input}
          type="text"
          name="fullname"
          placeholder="Namn"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <button
          className={styles.button}
          type="button"
          onClick={handleRegister}
        >
          Registrera Konto
        </button>
      </div>
    </>
  );
}
