import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import {toast} from "react-toastify";
import PasswordStrength from "../components/PasswordStrength";
import bgImage from "../assets/image 1.png";
import "../styles/Auth.css";

export default function SignUp() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleSignup = async (e) => {

    e.preventDefault(); // stop page reload

    try{

      setLoading(true);

      const response = await plainAPI.post("/auth/register", {
        // method:"POST",
        // headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ name,email,password })
      });

      const data = await response.json();

      if(!response.ok){
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Registration successful!");

      // ✅ STORE LOGIN TOKEN
     localStorage.setItem("access_token", data.access_token);
localStorage.setItem("refresh_token", data.refresh_token);

      // ✅ REDIRECT TO AI AGENTS PAGE
      navigate("/signin");

    }
    catch{
      alert("Server error. Try again.");
    }
    finally{
      setLoading(false);
    }
  };

  return (

    <div className="auth-fullscreen">

      {/* LEFT IMAGE */}
      <div
        className="auth-left"
        style={{ backgroundImage:`url(${bgImage})` }}
      />

      {/* RIGHT FORM */}
      <div className="auth-right">

        <div className="auth-form">

          <h2>Create Account</h2>
          <p className="auth-subtitle">Join CareerGuide today</p>

          {/* FORM START */}
          <form onSubmit={handleSignup}>

            {/* FULL NAME */}
            <div className="field">
              <input
                type="text"
                placeholder=" "
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
              <label>Full Name</label>
            </div>

            {/* EMAIL */}
            <div className="field">
              <input
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            {/* PASSWORD */}
            <div className="field">

              <input
                type={showPassword ? "text":"password"}
                placeholder=" "
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <label>Password</label>

              <span
                className="eye"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
              </span>

            </div>

            {/* PASSWORD STRENGTH */}
            <div className="password-strength">
              <PasswordStrength password={password}/>
            </div>

            {/* SIGNUP BUTTON */}
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

          </form>

          {/* <div className="divider">or</div> */}

           {/* EMAIL BUTTON
          <button className="social-btn">
            <MdEmail size={18}/> Continue with Email
          </button>

          {/* GOOGLE BUTTON */}
          {/* <button className="social-btn">
            <FcGoogle size={18}/> Continue with Google
          </button> */ }

          {/* SIGN IN LINK */}
          <div className="center-links">
            Already have an account?
            <span
              className="link"
              onClick={()=>navigate("/signin")}
            >
              {" "}Sign In
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}