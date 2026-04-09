import "../styles/About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">

        {/* ===== TITLE ===== */}
        <h1 className="about-title fade-in">About Us</h1>

        <p className="about-intro fade-in delay-1">
          Choosing a career shouldn’t feel confusing, overwhelming, or based on
          guesswork. We’re here to change that.
        </p>

        {/* ===== MAIN CARD ===== */}
        <div className="about-card fade-up delay-2">
          <p>
            Our <strong>AI-powered Career Guidance platform</strong> helps
            students discover career paths aligned with their skills,
            interests, strengths, and ambitions.
          </p>

          <p>
            Using intelligent Machine Learning models, we convert complex data
            into clear, personalized career insights backed by real-world
            analysis — not assumptions.
          </p>

          <p>
            Our platform is intuitive, accessible, and reliable — whether
            you’re a student exploring opportunities or an administrator
            managing career insights.
          </p>

          <h3 className="about-mission-title">Our Mission</h3>

          <p className="about-mission">
            To empower students with clarity, confidence, and direction —
            using the power of Artificial Intelligence.
          </p>

          <p className="about-closing">
            Your future deserves more than a guess. Let’s build it with insight.
          </p>
        </div>

      </div>
    </div>
  );
}
