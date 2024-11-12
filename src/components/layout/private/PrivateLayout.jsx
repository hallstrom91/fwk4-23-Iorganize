import Footer from "@footer/Footer";
import Sidebar from "@sidebar/Sidebar";
import styles from "./privateLayout.module.css";

export default function PrivateLayout({ children }) {
  return (
    <>
      <div className={styles.layoutContainer}>
        <header className={styles.header}>
          <Sidebar />
        </header>
        <main className={styles.mainContent}>{children}</main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
