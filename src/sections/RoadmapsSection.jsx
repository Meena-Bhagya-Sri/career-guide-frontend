import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./RoadmapsSection.css";
import { toast } from "react-toastify";
import API from "../api/axios";

function RoadmapsSection() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const [page, setPage] = useState(1);
  const roadmapsPerPage = 5;

  const [newRoadmap, setNewRoadmap] = useState({
    career_name: "",
    stage_number: "",
    stage_title: "",
    description: ""
  });

  const careersList = [
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst",
    "AI Researcher",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cyber Security Analyst"
  ];

  // ================= FETCH =================
  const fetchRoadmaps = async () => {
  try {
    setLoading(true);
    const res = await API.get("/roadmaps/");

    const fixedData = res.data.map((r) => ({
      ...r,
      stage_number: r.stage_number ?? r.step_number ?? "",
      stage_title: r.stage_title ?? r.step_title ?? ""
    }));

    setRoadmaps(fixedData);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  // ================= DELETE =================
  const deleteRoadmap = async (id) => {
    await API.delete(`/roadmaps/${id}`);
    fetchRoadmaps();
    toast.success("Deleted Roadmap");
  };

  // ================= ADD =================
  const addRoadmap = async () => {
    if (!newRoadmap.career_name) {
      toast.error("Select career");
      return;
    }

    if (!newRoadmap.stage_number || !newRoadmap.stage_title.trim()) {
      toast.error("All fields required");
      return;
    }

    try {
      const payload = {
        career_name: newRoadmap.career_name,
        stage_number: Number(newRoadmap.stage_number),
        stage_title: newRoadmap.stage_title,
        description: newRoadmap.description
      };

      await API.post("/roadmaps/", payload);

      setShowAdd(false);
      fetchRoadmaps();

      setNewRoadmap({
        career_name: "",
        stage_number: "",
        stage_title: "",
        description: ""
      });

      toast.success("Roadmap Added");
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Failed to Add");
    }
  };

  // ================= UPDATE =================
  const updateRoadmap = async () => {
  try {
    const payload = {
      career_name: selectedRoadmap.career_name,
      stage_number: Number(selectedRoadmap.stage_number),
      stage_title: selectedRoadmap.stage_title,
      description: selectedRoadmap.description
    };

    console.log("Updating:", payload);

    await API.put(`/roadmaps/${selectedRoadmap.roadmap_id}`, payload);

    setShowEdit(false);
    await fetchRoadmaps(); // 🔥 keep await here
    toast.success("Roadmap Updated ");
  } catch (err) {
    console.error(err.response?.data);
    toast.error("Update failed");
  }
};

  // ================= FILTER + SORT =================
  const filtered = roadmaps
    .filter((r) =>
      r.career_name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
  // 1️⃣ Sort by career_name
  if (a.career_name < b.career_name) return -1;
  if (a.career_name > b.career_name) return 1;

  // 2️⃣ Then sort by stage_number
  return a.stage_number - b.stage_number;
});

  // ================= PAGINATION =================
  const lastIndex = page * roadmapsPerPage;
  const firstIndex = lastIndex - roadmapsPerPage;
  const current = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / roadmapsPerPage);

  return (
    <div className="roadmaps-section">
      <div className="roadmaps-header">
        <h3 className="section-title">Roadmaps Management</h3>
        <button className="add-roadmap-btn" onClick={() => setShowAdd(true)}>
          Add Step
        </button>
      </div>

      <input
        className="roadmaps-search"
        placeholder="Search career..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="roadmaps-table">
        <thead>
          <tr>
            <th>Career</th>
            <th>Step</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <tr key={i}>
                <td colSpan="5">
                  <div className="skeleton-row"></div>
                </td>
              </tr>
            ))
          ) : (
            current.map((r) => (
              <tr key={r.roadmap_id}>
                <td>{r.career_name}</td>
                <td className="step-badge">Step {r.stage_number}</td>
                <td>{r.stage_title}</td>
                <td>{r.description}</td>
                <td>
                  <div className="action-buttons">
                    <FiEdit2
                      className="edit-icon"
                      onClick={() => {
                        setSelectedRoadmap(r);
                        setShowEdit(true);
                      }}
                    />
                    <FiTrash2
                      className="delete-icon"
                      onClick={() => deleteRoadmap(r.roadmap_id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ADD MODAL */}
      {/* ADD ROADMAP MODAL */}
{showAdd && (
  <>
    <style>
      {`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 14, 30, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-card {
          background: #0f0f17;
          border: 0.1px solid #00e9fa;
          border-radius: 16px;
          padding: 20px;
          width: 500px;
          height: auto;
          text-align: center;
          box-shadow: 0 4px 12px rgba(39, 226, 220, 0.3);
          margin: 0 10px 70px;
          animation: popup 0.25s ease;
        }

        .modal-card h3 {
          margin-bottom: 15px;
          color: #3b9dff;
          font-size: 22px;
        }

        .modal-input {
          width: 90%;
          margin: 8px 0;
          padding: 10px;
          font-size: 16px;
          border-radius: 6px;
          border: none;
          outline: none;
        }

        textarea.modal-input {
          resize: none;
          height: 80px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .modal-actions button {
          flex: 1;
          margin: 0 10px;
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .cancel-btn {
          background: #6c757d;
          color: #fff;
        }

        .confirm-btn {
          background: #14a6c0;
          color: #fff;
        }

        .modal-actions button:hover {
          opacity: 0.9;
          transform: scale(1.03);
          transition: 0.2s ease;
        }

        @keyframes popup {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}
    </style>

    <div className="modal-overlay" onClick={() => setShowAdd(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Add Roadmap Step</h3>

        <select
          className="modal-input"
          value={newRoadmap.career_name}
          onChange={(e) =>
            setNewRoadmap({
              ...newRoadmap,
              career_name: e.target.value
            })
          }
        >
          <option value="">Select Career</option>
          {careersList.map((career, i) => (
            <option key={i}>{career}</option>
          ))}
        </select>

        <input
          className="modal-input"
          placeholder="Step Number"
          value={newRoadmap.stage_number}
          onChange={(e) =>
            setNewRoadmap({
              ...newRoadmap,
              stage_number: e.target.value
            })
          }
        />

        <input
          className="modal-input"
          placeholder="Step Title"
          value={newRoadmap.stage_title}
          onChange={(e) =>
            setNewRoadmap({
              ...newRoadmap,
              stage_title: e.target.value
            })
          }
        />

        <textarea
          className="modal-input"
          placeholder="Description"
          value={newRoadmap.description}
          onChange={(e) =>
            setNewRoadmap({
              ...newRoadmap,
              description: e.target.value
            })
          }
        />

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={() => setShowAdd(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={addRoadmap}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </>
)}

      {/* EDIT ROADMAP MODAL */}
{showEdit && selectedRoadmap && (
  <>
    <style>
      {`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 14, 30, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-card {
          background: #0f0f17;
          border: 0.1px solid #00e9fa;
          border-radius: 16px;
          padding: 20px;
          width: 500px;
          height: auto;
          text-align: center;
          box-shadow: 0 4px 12px rgba(39, 226, 220, 0.3);
          margin: 0 10px 70px;
          animation: popup 0.25s ease;
        }

        .modal-card h3 {
          margin-bottom: 15px;
          color: #3b9dff;
          font-size: 22px;
        }

        .modal-input {
          width: 90%;
          margin: 8px 0;
          padding: 10px;
          font-size: 16px;
          border-radius: 6px;
          border: none;
          outline: none;
        }

        textarea.modal-input {
          resize: none;
          height: 80px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .modal-actions button {
          flex: 1;
          margin: 0 10px;
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .cancel-btn {
          background: #6c757d;
          color: #fff;
        }

        .confirm-btn {
          background: #14a6c0;
          color: #fff;
        }

        .modal-actions button:hover {
          opacity: 0.9;
          transform: scale(1.03);
          transition: 0.2s ease;
        }

        @keyframes popup {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}
    </style>

    <div className="modal-overlay" onClick={() => setShowEdit(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Roadmap</h3>

        <input
          className="modal-input"
          placeholder="Step Number"
          value={selectedRoadmap.stage_number}
          onChange={(e) =>
            setSelectedRoadmap({
              ...selectedRoadmap,
              stage_number: e.target.value
            })
          }
        />

        <input
          className="modal-input"
          placeholder="Step Title"
          value={selectedRoadmap.stage_title}
          onChange={(e) =>
            setSelectedRoadmap({
              ...selectedRoadmap,
              stage_title: e.target.value
            })
          }
        />

        <textarea
          className="modal-input"
          placeholder="Description"
          value={selectedRoadmap.description}
          onChange={(e) =>
            setSelectedRoadmap({
              ...selectedRoadmap,
              description: e.target.value
            })
          }
        />

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={updateRoadmap}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}

export default RoadmapsSection;