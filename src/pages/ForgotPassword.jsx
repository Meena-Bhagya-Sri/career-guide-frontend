import { Link } from "react-router-dom";
import authBg from "../assets/image 1.png";
import "../styles/Auth.css";
import {toast} from "react-toastify";
function ForgotPassword() {

  const handleReset = (e) => {
    e.preventDefault();
    toast.info("Reset link sent to your email");
  };

  return (
    <div className="auth-fullscreen">

      {/* LEFT IMAGE */}
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${authBg})` }}
      />

      {/* RIGHT FORM */}
      <div className="auth-right">

        <div className="auth-form">

          <h2>Reset Password</h2>

          <p className="auth-subtitle">
            Enter your email to receive a reset link
          </p>

          <form onSubmit={handleReset}>

            <div className="field">
              <input
                type="email"
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>

            <button
              type="submit"
              className="btn-primary"
            >
              Send Reset Link
            </button>

          </form>

          <div className="center-links">
            <Link to="/signin" className="link">
              Back to Login
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;