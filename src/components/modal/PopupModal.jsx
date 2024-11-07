import styles from "./popupModal.module.css";

export default function PopupModal() {
  return (
    <>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <p>PopUp Modal For Stuff</p>
        </div>
      </div>
    </>
  );
}
