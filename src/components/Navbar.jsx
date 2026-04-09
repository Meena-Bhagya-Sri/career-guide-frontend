import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import {toast} from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Navbar({ toggleTheme, darkMode }) {

  const [showLogout,setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const confirmLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/admin");
    toast.success("Admin Logged Out");
  };

  return (

    <>
      {/* NAVBAR */}

      <div className="navbar-custom">

        {/* LOGO */}
        <h2 className="logo-text">
          Admin Dashboard
        </h2>


        {/* RIGHT SIDE ACTIONS */}

        <div className="navbar-actions">

          {/* THEME SWITCH */}

          {/* <label className="theme-switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={darkMode}
            />
            <span className="slider"></span>
          </label> */}

          {/* LOGOUT BUTTON */}

          <button
            className="logout-btn"
            onClick={()=>setShowLogout(true)}
          >
            Logout
          </button>

        </div>

      </div>

      {/* LOGOUT POPUP */}

      {showLogout && (

        <div
          className="logout-modal"
          onClick={()=>setShowLogout(false)}
        >

          <div
            className="logout-card"
            onClick={(e)=>e.stopPropagation()}
          >

            <h3>Logout</h3>

            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">

              <button
                className="cancel-btn"
                onClick={()=>setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={confirmLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Navbar;