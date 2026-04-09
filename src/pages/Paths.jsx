import { useNavigate } from "react-router-dom";
import careerData from "../data/Careerdata";
import "../styles/Layout.css";

export default function Paths() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <h2>Career Paths</h2>

      <div className="row">
        {careerData.map((career) => (
          <div key={career.id}>
            <div
              className="career-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/app/paths/${career.id}`)}
            >
              <h4>{career.careerName}</h4>

              <p className="text-secondary">
                {career.description}
              </p>

              {/* ✅ CONNECTED TO STAGES */}
              <p className="text-secondary">
                {career.stages.length} Learning Stages
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}