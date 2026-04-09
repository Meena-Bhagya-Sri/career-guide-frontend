import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { scheduleSilentRefresh } from "../utils/silentRefresh";
import "../styles/Auth.css";
import bgImage from "../assets/image 1.png";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect to Signup
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Admin redirect
    if (role === "admin") {
      navigate("/admin");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("User not found. Please sign up!");
        return;
      }

      // ✅ Store tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      scheduleSilentRefresh();
      setIsAuth(true);

      // Store user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Decode role
      const decoded = jwtDecode(data.access_token);
      const userRole = decoded.role;

      toast.success("Login successful!");

      // Redirect
      navigate("/app/career/ai-agents");

    } catch (e) {
      toast.error("Server error.");
      console.log(e);
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