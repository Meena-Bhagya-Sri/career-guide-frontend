import { useNavigate, NavLink } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Topbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");

  const profile = JSON.parse(localStorage.getItem("profileData")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fullName = profile.fullName || user.name || "Navya";
  const email = profile.email || user.email || "";

  // ✅ LETTER (K)
  const profileLetter =
    fullName?.charAt(0)?.toUpperCase() ||
    email?.charAt(0)?.toUpperCase() ||
    "N";

  // ✅ IMAGE
  const profileImage = profile.avatar || null;

  // ✅ ANIMATED AVATAR
  const animatedAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${fullName}`;

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    setTheme(document.body.classList.contains("light") ? "light" : "dark");
  };

  return (
    <div className="topbar">
      <div></div>

      <div className="topbar-right">
        <NavLink to="/app/career/ai-agents" className="top-link">Home</NavLink>
        <NavLink to="/app/about" className="top-link">About</NavLink>
        <NavLink to="/app/roadmaps" className="top-link">Roadmap</NavLink>

        {/* THEME */}
        <span className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? <BsSun /> : <BsMoon />}
        </span>

        {/* ✅ PROFILE AVATAR */}
        <div
          className="profile-avatar"
          onClick={() => navigate("/profiledashboard")}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: "bold",
            color: "white",
            background: "linear-gradient(135deg,#7c3aed,#4f46e5)"
          }}
        >
          {profileImage ? (
            // ✅ 1. Uploaded image
            <img
              src={profileImage}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : fullName ? (
            // ✅ 2. Animated avatar
            <img
              src={animatedAvatar}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            // ✅ 3. Letter fallback
            profileLetter
          )}
        </div>
      </div>
    </div>
  );
}