import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/login_copy.png";
import "../styles/AdminLogin.css";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext); // ✅ FIX

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // clear old errors

    try {
      const response = await plainAPI.post("/auth/login", {
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          email,
          password,
          role: "admin",
        }),
      });

      const data = await response.json();

      // ❌ Handle backend error properly
      if (!response.ok) {
        const message = data?.error || "Login failed";
        setError(message);
        toast.error(message);
        return;
      }

      // ✅ Store tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // ✅ IMPORTANT: update global auth state
      setIsAuth(true);

      toast.success("Login Successful");

      // ✅ FIX: small delay avoids race condition
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 100);

    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-card">
        <h1 className="system-title">Admin Portal</h1>

        <p className="login-subtitle">
          AI Based Career Guidance System
        </p>

        <form onSubmit={handleLogin} autoComplete="off">
          
          {/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              required
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && <div className="login-error">{error}</div>}

          {/* LOGIN BUTTON */}
          <button className="login-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Sign In"}
          </button>

          {/* HOME BUTTON */}
          <button
            type="button"
            className="login-btn home-btn"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;