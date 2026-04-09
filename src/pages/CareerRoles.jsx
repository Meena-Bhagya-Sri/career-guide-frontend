import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import careerData from "../data/Careerdata";
import { BsArrowLeft } from "react-icons/bs";
import "../styles/Layout.css";

export default function CareerRoles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const career = careerData.find((c) => c.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  if (!career) {
    return <p className="text-danger">Career not found</p>;
  }

  const stages = career.stages;
  const selectedStage = stages[currentIndex];

  // ✅ PROGRESS CALCULATION (ADDED)
  const progressPercent = Math.round(
    ((currentIndex + 1) / stages.length) * 100
  );

  // SAME LOGIC AS YOUR ROADMAP PAGE
  const openPdf = (roadmapName) => {
    const fileName = roadmapName.replace(/\s+/g, "_") + ".pdf";
    window.open(`/Revised Roadmaps/${fileName}`, "_blank");
  };

  return (
    <div className="content" style={{ paddingBottom: "40px" }}>

      {/* ===================== BACK ===================== */}
      <div
        className="back-link"
        style={{ marginBottom: "18px" }}
        onClick={() => navigate("/app/paths")}
      >
        <BsArrowLeft /> Back to Paths
      </div>

      <h2 style={{ marginBottom: "6px" }}>
        {career.careerName}
      </h2>

      <p
        className="text-secondary"
        style={{ marginBottom: "20px" }}
      >
        Explore the learning stages for this career
      </p>

      {/* ===================== SKILL PROGRESS INDICATOR (ADDED) ===================== */}
      <div style={{ marginBottom: "26px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            marginBottom: "6px",
          }}
        >
          <span className="text-secondary">
            Skill Progress
          </span>
          <span>{progressPercent}%</span>
        </div>

        <div
          style={{
            height: "8px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* ===================== STAGE TABS ===================== */}
      <div
        className="stage-tabs"
        style={{ marginBottom: "24px" }}
      >
        {stages.map((stage, index) => (
          <button
            key={stage.stage_number}
            className={`stage-tab ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setSelectedSkill(null);
            }}
          >
            Stage {stage.stage_number}
          </button>
        ))}
      </div>

      {/* ===================== STAGE CARD ===================== */}
      <div
        className="career-card stage-card"
        style={{ marginBottom: "28px" }}
      >
        <h5 style={{ marginBottom: "8px" }}>
          Stage {selectedStage.stage_number}:{" "}
          {selectedStage.stage_title}
        </h5>

        <p
          className="text-secondary"
          style={{ marginBottom: "18px" }}
        >
          {selectedStage.description}
        </p>

        {/* ===================== SKILLS ===================== */}
        {selectedStage.skills && (
          <>
            <h6 style={{ marginBottom: "10px" }}>
              Skills Covered
            </h6>

            <div
              className="skills-list"
              style={{ marginBottom: "20px" }}
            >
              {selectedStage.skills.map((skill, index) => (
                <div
                  key={index}
                  className={`skill-chip ${
                    selectedSkill?.name === skill.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===================== ROADMAP ===================== */}
        {selectedSkill && (
          <>
            <h6 style={{ marginBottom: "10px" }}>
              🗺️ Roadmap for {selectedSkill.name}
            </h6>

            <div
              className="skills-list"
              style={{ marginBottom: "24px" }}
            >
              {selectedSkill.roadmap.map((roadmap, index) => (
                <div
                  key={index}
                  className="skill-chip"
                  style={{
                    cursor: "pointer",
                    background: "#1e293b",
                  }}
                  onClick={() => openPdf(roadmap)}
                >
                  📄 {roadmap}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===================== NAVIGATION ===================== */}
        <div className="stage-navigation">
          <button
            className="btn btn-prev"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            ← Previous
          </button>

          <button
            className="btn btn-next"
            disabled={currentIndex === stages.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
