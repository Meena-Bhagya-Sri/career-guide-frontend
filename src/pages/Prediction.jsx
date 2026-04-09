import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Layout.css";

export default function Prediction() {
  const location = useLocation();
  const navigate = useNavigate();

  const profile =
    location.state || JSON.parse(localStorage.getItem("profile"));

  if (!profile) {
    return (
      <div style={{ color: "white", padding: "20px" }}>
        No profile data found ❌
      </div>
    );
  }

  // ✅ CLEAN FUNCTION
  const cleanText = (text) => {
    if (!text) return "Not Available";
    try {
      return JSON.parse(text);
    } catch {
      return text.replace(/[{}"]/g, "");
    }
  };

  // ✅ DATA
  const rawCareer = profile.interests?.[0];
  const selectedCareer = cleanText(rawCareer);

  // ✅ 🔥 NEW: DYNAMIC CONFIDENCE CALCULATION
  const calculateConfidence = () => {
    const skills = profile.skills?.tech || [];
    const career = selectedCareer?.toLowerCase();

    if (!skills.length || !career) return 50;

    const careerSkillMap = {
      "backend developer": ["node", "express", "sql", "api", "java"],
      "data scientist": ["python", "pandas", "ml", "numpy"],
      "machine learning engineer": ["python", "ml", "tensorflow"],
      "frontend developer": ["react", "javascript", "html", "css"],
      "devops engineer": ["docker", "kubernetes", "linux"],
      "software engineer": ["java", "python", "c++", "dsa"],
      "cloud engineer": ["aws", "azure", "gcp"],
      "cyber security analyst": ["security", "network", "linux"]
    };

    const requiredSkills = careerSkillMap[career] || [];

    let matchCount = 0;

    skills.forEach((skill) => {
      if (
        requiredSkills.some((req) =>
          skill.toLowerCase().includes(req)
        )
      ) {
        matchCount++;
      }
    });

    const score = Math.min(
      100,
      Math.round((matchCount / (requiredSkills.length || 1)) * 100)
    );

    return score || 50;
  };

  const confidence = calculateConfidence();

  // ✅ SUGGESTIONS
  const suggestions =
    JSON.parse(localStorage.getItem("suggestions")) || [];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Career Prediction</h1>

      <div style={styles.card}>

        {/* 🎯 CAREER */}
        <h2 style={styles.section}>Selected Career</h2>
        <div style={styles.mainBadge}>
          {selectedCareer}
        </div>

        {/* 📊 CONFIDENCE */}
        <h3 style={styles.section}>Prediction Confidence</h3>
        <div style={styles.progressBox}>
          <div
            style={{
              ...styles.progressBar,
              width: `${confidence || 0}%`,
            }}
          />
          <span style={styles.progressText}>{confidence}%</span>
        </div>

        {/* 🎯 SUGGESTIONS */}
        <h3 style={styles.section}>Recommended Careers</h3>
        <div style={styles.tags}>
          {suggestions.map((item, i) => (
            <span key={i} style={styles.tag}>
              {cleanText(item)}
            </span>
          ))}
        </div>

        {/* 💻 SKILLS */}
        <h3 style={styles.section}>Skills</h3>
        <div style={styles.tags}>
          {profile.skills?.tech?.map((skill, i) => (
            <span key={i} style={styles.tag}>
              {cleanText(skill)}
            </span>
          ))}
        </div>

        {/* 🎓 EDUCATION */}
        <h3 style={styles.section}>Education</h3>
        <p style={styles.text}>
          {profile.education?.level} - {profile.education?.field}
        </p>

        {/* 🚀 RESULT */}
        <div style={styles.resultBox}>
          🚀 Based on your interest in{" "}
          <strong>{selectedCareer}</strong>,  
          we recommend focusing on relevant skills and projects.
        </div>

        <button
          style={styles.btn}
          onClick={() => navigate("/profiledashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "radial-gradient(circle at top, #0f172a, #020617)",
    color: "white",
  },

  title: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "30px",
    fontWeight: "700",
    background: "linear-gradient(90deg,#38bdf8,#a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  card: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  },

  section: {
    marginTop: "20px",
    marginBottom: "10px",
    fontWeight: "600",
  },

  mainBadge: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "999px",
    background: "#22c55e",
    fontWeight: "600",
    fontSize: "18px",
  },

  progressBox: {
    height: "20px",
    background: "#1e293b",
    borderRadius: "10px",
    position: "relative",
    marginBottom: "15px",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#22c55e,#38bdf8)",
    borderRadius: "10px",
  },

  progressText: {
    position: "absolute",
    right: "10px",
    top: "-25px",
    fontSize: "14px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  tag: {
    background: "#1e293b",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
  },

  text: {
    color: "#cbd5f5",
  },

  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#0f172a",
    borderRadius: "12px",
  },

  btn: {
    marginTop: "25px",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#7c3aed",
    color: "white",
    cursor: "pointer",
  },
};