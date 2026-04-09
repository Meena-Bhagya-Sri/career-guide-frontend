import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./CareersSection.css";
import {toast} from "react-toastify";
function CareersSection() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedCareer, setSelectedCareer] = useState(null);

  const [page, setPage] = useState(1);
  const careersPerPage = 5;

  const [newCareer, setNewCareer] = useState({
    career_name: "",
    avg_salary: "",
    difficulty_level: "",
    description: ""
  });

  const fetchCareers = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/careers/`)
      .then(res => res.json())
      .then(data => {
        setCareers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const deleteCareer = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/careers/${id}`, { method: "DELETE" })
      .then(() => fetchCareers());
      toast.success("Deleted Skill");
  };

  const addCareer = () => {
    fetch(`${import.meta.env.VITE_API_URL}/careers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCareer)
    })
      .then(() => {
        setShowAdd(false);
        fetchCareers();
        setNewCareer({
          career_name: "",
          avg_salary: "",
          difficulty_level: "",
          description: ""
        });
      });
      toast.success("Skill Added");
  };

  const updateCareer = () => {
    fetch(`${import.meta.env.VITE_API_URL}/careers/${selectedCareer.career_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedCareer)
    })
      .then(() => {
        setShowEdit(false);
        fetchCareers();
      });
      toast.success("Updated Skill");
  };

  const filteredCareers = careers.filter(c =>
    c.career_name?.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = page * careersPerPage;
  const firstIndex = lastIndex - careersPerPage;
  const currentCareers = filteredCareers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredCareers.length / careersPerPage);

  return (
    <div className="careers-section">
      <div className="careers-header">
        <h3 className="section-title">Careers Management</h3>
        <button className="add-career-btn" onClick={() => setShowAdd(true)}>
          Add Career
        </button>
      </div>

      <input
        className="careers-search"
        placeholder="Search careers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="careers-table">
        <thead>
          <tr>
            <th>Career</th>
            <th>Average Salary</th>
            <th>Difficulty Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <tr key={i}>
                <td colSpan="4">
                  <div className="skeleton-row"></div>
                </td>
              </tr>
            ))
          ) : (
            currentCareers.map(c => (
              <tr key={c.career_id}>
                <td className="career-cell">
                  <div className="career-icon">
                    {(c.career_name?.charAt(0)?.toUpperCase() ?? "")}
                  </div>
                  {c.career_name}
                </td>
                <td className="salary-range">{c.avg_salary}</td>
                <td>{c.difficulty_level}</td>
                <td>
                  <div className="action-buttons">
                    <FiEdit2
                      className="edit-icon"
                      onClick={() => {
                        setSelectedCareer(c);
                        setShowEdit(true);
                      }}
                    />
                    <FiTrash2
                      className="delete-icon"
                      onClick={() => deleteCareer(c.career_id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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

      {/* Add Career Modal */}
     {/* ADD CAREER MODAL */}
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

        .modal-form {
          display: flex;
          flex-direction: column;
          align-items: center;
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
        <h3>Add Career</h3>

        <div className="modal-form">
          <input
            className="modal-input"
            placeholder="Career Name"
            value={newCareer.career_name}
            onChange={(e) =>
              setNewCareer({
                ...newCareer,
                career_name: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Average Salary"
            value={newCareer.avg_salary}
            onChange={(e) =>
              setNewCareer({
                ...newCareer,
                avg_salary: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Difficulty Level"
            value={newCareer.difficulty_level}
            onChange={(e) =>
              setNewCareer({
                ...newCareer,
                difficulty_level: e.target.value
              })
            }
          />

          <textarea
            className="modal-input"
            placeholder="Description"
            value={newCareer.description}
            onChange={(e) =>
              setNewCareer({
                ...newCareer,
                description: e.target.value
              })
            }
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={() => setShowAdd(false)}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={addCareer}>
            Add
          </button>
        </div>
      </div>
    </div>
  </>
)}

     {/* EDIT CAREER MODAL */}
{showEdit && selectedCareer && (
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

        .modal-form {
          display: flex;
          flex-direction: column;
          align-items: center;
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
        <h3>Edit Career</h3>

        <div className="modal-form">
          <input
            className="modal-input"
            placeholder="Career Name"
            value={selectedCareer.career_name}
            onChange={(e) =>
              setSelectedCareer({
                ...selectedCareer,
                career_name: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Average Salary"
            value={selectedCareer.avg_salary}
            onChange={(e) =>
              setSelectedCareer({
                ...selectedCareer,
                avg_salary: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Difficulty Level"
            value={selectedCareer.difficulty_level}
            onChange={(e) =>
              setSelectedCareer({
                ...selectedCareer,
                difficulty_level: e.target.value
              })
            }
          />

          <textarea
            className="modal-input"
            placeholder="Description"
            value={selectedCareer.description}
            onChange={(e) =>
              setSelectedCareer({
                ...selectedCareer,
                description: e.target.value
              })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={updateCareer}
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

export default CareersSection;
