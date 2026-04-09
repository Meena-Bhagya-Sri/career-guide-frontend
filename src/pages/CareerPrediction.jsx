import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Layout.css";
import {toast} from "react-toastify";
function CareerPrediction() {

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePredict = async () => {

    setLoading(true);

    try {

      const res = await API.get("/recommendations/ml-career");

      console.log("Prediction Response:", res.data);

      setPrediction(res.data);

    } catch (err) {

      console.error(err);
      toast.error("❌ Failed to predict career.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="career-page">

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

      <div className="career-card">

        <h2 className="career-heading">Career Recommendation</h2>

        <p className="career-subtext">
          Based on your skills and profile, we recommend this career for you:
        </p>

        {prediction ? (

          <div className="career-result">

            {/* Career Name */}
            <h3 className="career-title">{prediction.career}</h3>

            {/* Description */}
            {prediction.description && (
              <p className="career-description">
                {prediction.description}
              </p>
            )}

            {/* Salary */}
            {prediction.avg_salary && (
              <p className="career-meta">
                💰 <strong>Average Salary:</strong> {prediction.avg_salary}
              </p>
            )}

            {/* Difficulty */}
            {prediction.difficulty_level && (
              <p className="career-meta">
                ⚡ <strong>Difficulty Level:</strong> {prediction.difficulty_level}
              </p>
            )}

            <button
              className="btn-primary"
              onClick={() => {

                console.log("Career ID:", prediction?.career_id);

                if (!prediction?.career_id) {
                  alert("Career ID missing from API");
                  return;
                }

                navigate(`/app/skill-gap/${prediction.career_id}`);

              }}
            >
              View Skill Gap
            </button>

          </div>

        ) : (

          <button
            className="btn-primary"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Career"}
          </button>

        )}

      </div>

    </div>

  );
}

export default CareerPrediction;