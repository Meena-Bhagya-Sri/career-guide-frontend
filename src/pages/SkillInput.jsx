import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Layout.css";
import {toast} from "react-toastify";


const skillMap = {
  "Python": 1,
  "Java": 2,
  "JavaScript": 3,
  "SQL": 4,
  "Machine Learning": 5,
  "Deep Learning": 6,
  "Data Analysis": 7,
  "Statistics": 8,
  "HTML & CSS": 9,
  "React": 10,
  "Node.js": 11,
  "AWS": 12,
  "Docker": 13,
  "Kubernetes": 14,
  "Networking": 15,
  "Linux": 16,
  "Ethical Hacking": 17,
  "Communication": 18,
  "Problem Solving": 19,
  "Mathematics Level": 20,
  "Logical Reasoning": 21,
  "Creativity": 22
};
const skills = Object.keys(skillMap);

function SkillInput() {
  const [selectedSkills, setSelectedSkills] = useState({});
  const navigate = useNavigate();

  const handleChange = (skill, value) => {
    setSelectedSkills({
      ...selectedSkills,
      [skill]: Number(value)
    });
  };

  const submitSkills = async () => {
  try {

    const payload = Object.entries(selectedSkills).map(
      ([skill, level]) => ({
        skill_id: skillMap[skill],
        proficiency_level: level
      })
    );

    console.log(payload);

    await API.post("/user_skills/add", { skills: payload });

    toast.success("✅ Skills saved successfully!");

  } catch (err) {
    console.error("Full error:", err.response?.data || err);
    toast.error("❌ Failed to save skills");
  }
};
  return (
    <div className="skill-page">

      <div
        className="back-link"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "90px",
          left: "60px",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        ← Back
      </div>

      <h2 className="skill-heading">Add Your Skills</h2>

      <p className="skill-subtext">
        Rate your proficiency from 1 (Beginner) to 5 (Expert)
      </p>

      <div className="skill-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill}>

            <label className="skill-label">{skill}</label>

            <input
              type="range"
              min="1"
              max="5"
              value={selectedSkills[skill] || 1}
              className="skill-slider"
              onChange={(e) => handleChange(skill, e.target.value)}
            />

            <div className="skill-level">
              Level: {selectedSkills[skill] || 1}
            </div>

          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={submitSkills}>
        Save Skills
      </button>

    </div>
  );
}

export default SkillInput;