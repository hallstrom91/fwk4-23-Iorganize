import { useState, useEffect } from "react";
import styles from "./cookieconsent.module.css";
import { useAuth } from "@contexts/AuthContext";

export default function CookieConsent() {
  const { checkCookieConsent, acceptCookieConsent, declineCookieConsent } =
    useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    checkConsentStatus();
  }, []);

  const checkConsentStatus = async () => {
    try {
      const consentStatus = await checkCookieConsent();
      console.log("consent status:", consentStatus);

      if (consentStatus === "missing") {
        setShowPopup(true);
      }
    } catch (error) {
      console.error("failed to check consent", error); // remove
    }
  };

  const handleAccept = async () => {
    try {
      await acceptCookieConsent();
      setShowPopup(false);
    } catch (error) {
      console.error("Failed to accept cookie consent"); // remove
    }
  };

  const handleDecline = async () => {
    try {
      await declineCookieConsent();
      setShowPopup(false);
    } catch (error) {
      console.error("Failed to decline cookie consent"); // remove
    }
  };
  if (!showPopup) {
    return null;
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>We use cookies to improve your experience. Do you accept cookies?</p>
        <button
          onClick={handleAccept}
          className={`${styles.button} ${styles.buttonAccept}`}
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className={`${styles.button} ${styles.buttonDecline}`}
        >
          Decline
        </button>

        <button
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          className={styles.readMore}
        >
          Read more about our cookies and GDPR
        </button>
        {showMoreInfo && (
          <div className={styles.moreInfo}>
            <h4>Cookie and GDPR Information</h4>
            <p>
              We use cookies to store user preferences, manage authentication,
              and provide secure access to our services. Some of the main uses
              include:
            </p>
            <ul>
              <li>
                <strong>User Information:</strong> Cookies store essential data
                like user preferences and session information for a personalized
                experience.
              </li>
              <li>
                <strong>Authorization and Authentication:</strong> Cookies
                support secure logins and help protect access to your data.
              </li>
              <li>
                <strong>Permissions:</strong> Depending on your role, cookies
                may track permissions, like the ability to delete users or
                manage sensitive data.
              </li>
              <li>
                <strong>Data Security:</strong> Cookies are configured with
                secure settings, and sensitive information is handled according
                to GDPR standards.
              </li>
            </ul>
            <p>
              We are committed to protecting your data and only use cookies
              necessary for delivering our services. For more details, please
              refer to our privacy policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
