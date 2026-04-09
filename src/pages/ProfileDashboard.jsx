import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMagic, FaHistory } from "react-icons/fa";
import "../styles/Layout.css";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // ✅ LOAD + SYNC SIGNUP DATA
  useEffect(() => {
    try {
      let data = localStorage.getItem("profileData");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!data && user) {
        const newProfile = {
          fullName: user.name || "",
          email: user.email || "",
          gender: "",
          education: {
            level: "",
            field: "",
            score: ""
          },
          skills: { tech: [] },
          interests: []
        };

        localStorage.setItem("profileData", JSON.stringify(newProfile));
        setProfile(newProfile);
        return;
      }

      if (data) {
        const parsed = JSON.parse(data);

        // ✅ 🔥 FIX: Ensure gender + education always exist
        const updatedProfile = {
          ...parsed,
          fullName: parsed.fullName || user?.name || "",
          email: parsed.email || user?.email || "",
          gender: parsed.gender || "",
          education: {
            level: parsed.education?.level || "",
            field: parsed.education?.field || "",
            score: parsed.education?.score || ""
          }
        };

        localStorage.setItem("profileData", JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
      }

    } catch (err) {
      console.error("Load error:", err);
    }
  }, []);

  if (!profile) {
    return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;
  }

  const handleEditProfile = () => navigate("/profile");

  // ✅ SAME CONFIDENCE LOGIC
  const calculateConfidence = (profile) => {
    const skills = profile.skills?.tech || [];
    const career = profile.interests?.[0]?.toLowerCase();

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

  // ✅ PREDICTION FUNCTION
  const handlePrediction = () => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));

    if (!savedProfile || !savedProfile.interests?.length) {
      alert("Please select your career interest");
      navigate("/profile");
      return;
    }

    const interest = savedProfile.interests[0];

    const suggestionsMap = {
      "Data Analyst": ["Data Scientist", "Business Analyst", "ML Engineer"],
      "Machine Learning Engineer": ["AI Engineer", "Data Scientist"],
      "Backend Developer": ["Full Stack Developer", "Software Engineer"],
      "Cyber Security": ["Ethical Hacker", "Security Analyst"],
    };

    const suggestions = suggestionsMap[interest] || [
      interest,
      "Software Engineer",
      "Tech Specialist",
    ];

    const confidence = calculateConfidence(savedProfile);

    localStorage.setItem("lastPrediction", interest);
    localStorage.setItem("confidence", confidence);
    localStorage.setItem("suggestions", JSON.stringify(suggestions));

    navigate("/prediction", {
      state: savedProfile,
    });
  };

  const cleanText = (text) => {
    if (!text) return "Get Prediction";
    return text.replace(/[{}"]/g, "");
  };

  const lastPrediction = cleanText(
    localStorage.getItem("lastPrediction")
  );

  const confidence =
    localStorage.getItem("confidence") || "--";

  return (
    <div className="dashboard-page">
      <div className="container">

        <h1>Welcome back, {profile.fullName || "User"}!</h1>
        <p className="subtitle">
          Your AI-powered career guidance control center
        </p>

        <div style={styles.grid}>

          {/* PROFILE */}
          <div style={styles.card} onClick={handleEditProfile}>
            <div style={{ ...styles.iconBox, background: "#06b6d4" }}>
              <FaUser />
            </div>
            <h3 style={styles.title}>Complete Profile</h3>
            <p style={styles.desc}>Add your details</p>
          </div>

          {/* PREDICTION */}
          <div style={styles.card} onClick={handlePrediction}>
            <div style={{ ...styles.iconBox, background: "#ec4899" }}>
              <FaMagic />
            </div>
            <h3 style={styles.title}>Predicted Career</h3>

            <p style={styles.desc}>{lastPrediction}</p>

            <p style={{ fontSize: "12px", color: "#22c55e" }}>
              Confidence: {confidence}%
            </p>
          </div>

          {/* HISTORY (REDIRECT ONLY) */}
          <div style={styles.card} onClick={() => navigate("/history")}>
            <div style={{ ...styles.iconBox, background: "#22c55e" }}>
              <FaHistory />
            </div>
            <h3 style={styles.title}>View History</h3>

            <p style={styles.desc}>
              Click to view your profile history
            </p>
          </div>
  {/* 🔥 BACK BUTTON ADDED HERE */}
      <button
        onClick={() => navigate("/app/career/ai-agents")}
        style={{
          padding: "10px 15px",
          background: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ⬅ Back to Dashboard
      </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    marginTop: "20px",
    justifyContent: "center",
  },
  card: {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    borderRadius: "16px",
    padding: "25px",
    color: "white",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "0.3s",
    textAlign: "center",
  },
  iconBox: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "white",
    margin: "0 auto 15px",
  },
  title: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  desc: {
    fontSize: "14px",
    color: "#cbd5f5",
  },
};