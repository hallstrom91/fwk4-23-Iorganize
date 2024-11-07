import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navLink}>
            <Link className={styles.navLink} to="/">
              Login
            </Link>
          </li>
          <li className={styles.navLink}>
            <Link className={styles.navLink} to="/register">
              Registrera
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
