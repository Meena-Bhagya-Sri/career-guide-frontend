import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { scheduleSilentRefresh } from "../utils/silentRefresh";
import "../styles/Auth.css";
import bgImage from "../assets/image1.png";
import { plainAPI } from "../api/axios"; 

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
 console.log(import.meta.env.VITE_API_URL);
  // ✅ Redirect to Signup
  const handleSignupRedirect = () => {
    navigate("/signup");
  };



const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

      const response = await plainAPI.post(
      "/auth/login", // ⚠️ change to /api/auth/login if needed
      JSON.stringify({
    email,
    password,
    role,
  }),
      {
        headers: {
          "Content-Type": "application/json", // ✅ THIS FIXES 415
        },
      }
    );

    const data = response.data;

    // ✅ Store tokens
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    // ✅ Store user
    localStorage.setItem("user", JSON.stringify(data.user));

    setIsAuth(true);

    toast.success("Login successful!");
    navigate("/app/career/ai-agents");

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-fullscreen">
      {/* LEFT IMAGE */}
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-form">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in as:</p>

          {/* ROLE SELECTOR */}
          <div className="role-selector">
            <label>
              <input
                type="radio"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
              />
              Student
            </label>

            <label>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => {
                  setRole("admin");
                  navigate("/admin");
                }}
              />
              Admin
            </label>
          </div>

          {/* STUDENT LOGIN FORM */}
          {role === "student" && (
            <form onSubmit={handleLogin}>
              {/* EMAIL */}
              <div className="field">
                <input
                  type="email"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>

              {/* PASSWORD */}
              <div className="field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label>Password</label>

                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* ✅ SIGNUP LINK */}
              <p className="auth-switch">
                Don’t have an account?{" "}
                <span onClick={handleSignupRedirect} className="link">
                  Sign Up
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}