import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";

export default function CareerDetails() {
  const navigate = useNavigate();

  const features = [
    {
      name: "Skill Input",
      description: "Rate your skills and proficiency levels",
      path: "/app/skill-input"
    },
    {
      name: "Career Prediction",
      description: "Get AI-based career recommendations",
      path: "/app/career-prediction"
    },
    // {
    //   name: "Skill Gap Analysis",
    //   description: "Analyze gaps between your skills and career needs",
    //   path: "/app/skill-gap"
    // }
  ];

  return (
    <div className="container">
      <h1>Predict Career</h1>
      <p className="subtitle">
        Use intelligent tools to evaluate your skills, predict suitable careers, and identify skill gaps.
      </p>

      <div className="career-grid">
        {features.map((item, index) => (
          <div
            key={index}
            className="glass career-card"
            onClick={() => navigate(item.path)}
            style={{ cursor: "pointer" }}
          >
            <h3>{item.name}</h3>
            <p className="subtitle">{item.description}</p>
            <span className="link-text">Open →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
