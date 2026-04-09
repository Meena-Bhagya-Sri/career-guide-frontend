import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/Logout.css";
import {toast} from "react-toastify";
export default function LogoutModal({ setShowLogout }) {
  const navigate = useNavigate();

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowLogout(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Disable scroll
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logout Sucessfull");
    navigate("/signin");
  };

  // ✅ PORTAL HERE (NOT IN SIDEBAR)
  return createPortal(
   <div
  className="logout-backdrop"
  onClick={() => setShowLogout(false)}
>
  <div className="logout-overlay">
    <div
      className="logout-card"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="logout-title">Logout</h3>

      <p className="logout-text">
        Are you sure you want to logout?
      </p>

      <div className="logout-actions">
        <button
          className="cancel-btn"
          onClick={() => setShowLogout(false)}
        >
          Cancel
        </button>

        <button
          className="logout-btn"
          onClick={confirmLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</div>,
    document.body
  );
}