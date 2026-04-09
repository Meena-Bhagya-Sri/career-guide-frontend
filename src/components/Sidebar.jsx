import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdMenuBook,
  MdLogout,
  MdTimeline,
  MdPerson,
} from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Layout.css";

export default function Sidebar({ setShowLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { setIsAuth } = useContext(AuthContext);

  // ✅ Check login
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-left">
          <span className="logo-bar" />
          {!collapsed && <span className="logo-text">CareerGuide</span>}
        </div>

        <FiMenu
          className="menu-icon"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* MENU */}
      <div className="sidebar-menu" style={{ flex: 1 }}>
        <NavLink to="/app/career/ai-agents" className="side-link">
          <MdDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/app/paths" className="side-link">
          <MdTimeline size={20} />
          {!collapsed && <span>Paths</span>}
        </NavLink>

        <NavLink to="/app/resources" className="side-link">
          <MdMenuBook size={20} />
          {!collapsed && <span>Resources</span>}
        </NavLink>
      </div>

      {/* BOTTOM */}
      <div className="sidebar-bottom">
        <NavLink to="/profileDashboard" className="side-link">
          <MdPerson size={20} />
          {!collapsed && <span>Profile</span>}
        </NavLink>

        {isLoggedIn && (
          <div
            className="side-link logout"
            onClick={() => setShowLogout(true)}
          >
            <MdLogout size={20} />
            {!collapsed && <span>Logout</span>}
          </div>
        )}
      </div>
    </div>
  );
}