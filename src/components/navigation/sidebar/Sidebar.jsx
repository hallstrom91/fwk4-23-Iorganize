import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <h1 className={styles.logo}>I-Organize</h1>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link to="/myboards" className={styles.navLink}>
                All Boards
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Something Else
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Something more
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
