import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/skillgap.css";
function SkillGap() {

 const { career_id } = useParams();

useEffect(() => {
  console.log("Career ID:", career_id);
}, [career_id]);
  const navigate = useNavigate();

  const [gapData, setGapData] = useState(null);
  console.log("Career ID:", career_id);
  useEffect(() => {

  if (!career_id) return;

  const fetchGap = async () => {

    try {

      const res = await API.get(`/recommendations/skill-gap/${career_id}`);

      setGapData(res.data);

    } catch (err) {

      console.error("Skill Gap Error:", err);

    }

  };

  fetchGap();

}, [career_id]);

  if (!gapData) {

    return <h2 style={{ padding: "40px" }}>Loading Skill Gap...</h2>;

  }
return (
  <div className="skill-gap-page">

    <div className="skill-gap-card">

      <div className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <h1 className="gap-title">Skill Gap Analysis</h1>
      <h3 className="gap-subtitle">
        Skill Gap Analysis for {gapData.career}
      </h3>

      <div className="gap-summary">

        <p className="readiness">
          Readiness Score: {gapData.readiness}/100
        </p>

        <p className="improvement">
          {gapData.improvementNeeded} out of {gapData.totalSkills} skills need improvement
        </p>

      </div>
<div className="table-wrapper">
      <table className="gap-table">

        <thead>
          <tr>
            <th>Skill Name</th>
            <th>Required</th>
            <th>Yours</th>
            <th>Gap</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {gapData.skills.map((skill, index) => (
            <tr key={index}>
              <td>{skill.name}</td>
              <td>{skill.required}</td>
              <td>{skill.yours}</td>
              <td>{skill.gap}</td>

              <td className={
                skill.status === "Needs Improvement"
                  ? "status-bad"
                  : "status-good"
              }>
                {skill.status}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
</div>
    </div>
<div className="skill-gap-actions">

 

  <button
    className="btn-primary"
   onClick={() => navigate(`/app/roadmapDetail/${career_id}`)}
  >
    View Learning Roadmap →
  </button>

</div>
  </div>
  
);
}
export default SkillGap;