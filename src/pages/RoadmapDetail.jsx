import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/Roadmap.css";

function RoadmapDetail() {
  const { career_id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchRoadmap = async () => {
      
      try {
        const res = await API.get(`/roadmaps/${career_id}`, {

});

        setRoadmap(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [career_id]);

  if (loading) {
    return <h2 className="loading">Loading roadmap...</h2>;
  }

  if (error) {
    return <h2 className="loading">{error}</h2>;
  }

  return (
    <div className="roadmap-page">
      <h1>{roadmap.career.career_name} Roadmap</h1>

      {roadmap.roadmap.map((stage) => (
        <div key={stage.stage_number} className="roadmap-stage">

          {/* Stage Title */}
          {stage.stage_link ? (
            <a
              href={stage.stage_link}
              target="_blank"
              rel="noopener noreferrer"
              className="stage-link"
            >
              <h2>
                Stage {stage.stage_number}: {stage.stage_title}
              </h2>
            </a>
          ) : (
            <h2>
              Stage {stage.stage_number}: {stage.stage_title}
            </h2>
          )}

          {/* Description */}
          <p>{stage.description}</p>

          {/* Resources */}
          {stage.resources.length > 0 ? (
            <ul>
              {stage.resources.map((r, index) => (
                <li key={index}>
                  <a
                    href={r.resource_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.resource_title} ({r.resource_type})
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-resource">No resources available.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default RoadmapDetail;