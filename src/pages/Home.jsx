import "../styles/Home.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/BG2.mp4";

export default function Home() {

const navigate = useNavigate();
const videoRef = useRef(null);

/* ===================== SLOW MOTION VIDEO ===================== */
useEffect(() => {
if (videoRef.current) {
videoRef.current.playbackRate = 0.5;
}
}, []);

/* ===================== TYPING EFFECT ===================== */
const fullText =
"A modern career guidance system to help students explore paths, develop skills, and achieve their goals confidently.";

const [text, setText] = useState("");
const [index, setIndex] = useState(0);

useEffect(() => {
if (index < fullText.length) {
const t = setTimeout(() => {
setText((prev) => prev + fullText[index]);
setIndex((prev) => prev + 1);
}, 25);

  return () => clearTimeout(t);
}


}, [index]);

/* ===================== MODAL ===================== */
const [showModal, setShowModal] = useState(false);

const goToSignin = () => {
navigate("/signin");
};

const goToSignup = () => {
navigate("/signup");
};

/* ===================== EXPLORE BUTTON ===================== */
const handleExplore = () => {


const loggedIn = localStorage.getItem("token");

if (loggedIn) {
  navigate("/app/paths"); // go to dashboard
} else {
  setShowModal(true); // show login modal
}


};

return ( <div className="blob-page">


  <video
    ref={videoRef}
    className="bg-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={bgVideo} type="video/mp4" />
  </video>

  <div className="video-overlay"></div>

  <div className="page-content">
    <div className="page">

      <nav className="navbar">
        <h3 className="logo">CareerGuide</h3>
      </nav>

      <div className="hero">
        <div className="hero-text">

          <h1 className="futuristic-title">
            Career <br /> Guidance
          </h1>

          <p className="typing futuristic-subtitle">
            {text}
            <span className="cursor">|</span>
          </p>

          <button
            className="main-btn"
            onClick={handleExplore}
          >
            Explore More
          </button>

        </div>
      </div>

    </div>
  </div>

  {showModal && (
    <div className="modal-backdrop" onClick={() => setShowModal(false)}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Get Started</h2>
        <p>Choose how you want to continue</p>

        <button
          className="modal-btn primary"
          onClick={goToSignin}
        >
          Sign In
        </button>

        <button
          className="modal-btn secondary"
          onClick={goToSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  )}

</div>

);
}
