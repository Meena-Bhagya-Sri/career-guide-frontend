import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LogoutModal from "../components/LogoutModal";
import "../styles/Layout.css";

export default function MainLayout() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <div className="app-layout">
        
        <Sidebar setShowLogout={setShowLogout} />

        <div className="main-area">
          <Topbar />

          <div className="page-content">
            <Outlet />
          </div>
        </div>

      </div>

      {/* ✅ GLOBAL MODAL */}
      {showLogout && (
        <LogoutModal setShowLogout={setShowLogout} />
      )}
    </>
  );
}