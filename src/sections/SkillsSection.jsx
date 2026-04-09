import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./SkillsSection.css";
import { toast } from "react-toastify";
import API from "../api/axios";

function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const [page, setPage] = useState(1);
  const skillsPerPage = 5;

  const [newSkill, setNewSkill] = useState({
    skill_name: "",
    skill_type: ""
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await API.get("/skills/");
      setSkills(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const deleteSkill = async (id) => {
    try {
      await API.delete(`/skills/${id}`);
      fetchSkills();
      toast.success("Skill Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const addSkill = async () => {
    if (!newSkill.skill_name.trim()) {
      toast.error("Skill name required");
      return;
    }

    if (!newSkill.skill_type.trim()) {
      toast.error("Skill type required");
      return;
    }

    if (
      skills.some(
        (s) =>
          s.skill_name.trim().toLowerCase() ===
          newSkill.skill_name.trim().toLowerCase()
      )
    ) {
      toast.error("Skill already exists");
      return;
    }

    try {
      console.log("Sending:", newSkill);

      await API.post("/skills/", newSkill);

      setShowAdd(false);
      fetchSkills();
      setNewSkill({ skill_name: "", skill_type: "" });

      toast.success("Skill Added");
    } catch (err) {
      console.error("Backend Error:", err.response?.data);
      const message = err.response?.data?.error;
      toast.error(message || "Failed to add skill");
    }
  };

const updateSkill = async () => {
  try {
    const payload = {
      skill_name: selectedSkill.skill_name?.trim(),
      skill_type: selectedSkill.skill_type,
    };
    console.log(payload);

    if (!payload.skill_name) {
      toast.error("Skill name required");
      return;
    }

    await API.put(`/skills/${selectedSkill.id}`, payload);

    setShowEdit(false);
    fetchSkills();
    toast.success("Skill Updated");
  } catch (err) {
    console.error("Update Error:", err.response?.data);
    toast.error(err.response?.data?.error || "Update failed");
  }
};
  const filteredSkills = skills.filter((s) =>
    s.skill_name.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = page * skillsPerPage;
  const firstIndex = lastIndex - skillsPerPage;
  const currentSkills = filteredSkills.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

  return (
    <div className="skills-section">
      <div className="skills-header">
        <h3 className="section-title">Skills Management</h3>
        <button className="add-skill-btn" onClick={() => setShowAdd(true)}>
          Add Skill
        </button>
      </div>

      <input
        className="skills-search"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="skills-table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <tr key={i}>
                <td colSpan="3">
                  <div className="skeleton-row"></div>
                </td>
              </tr>
            ))
          ) : (
            currentSkills.map((s) => (
              <tr key={s.id}>
                <td className="skill-cell">
                  <div className="skill-icon">
                    {s.skill_name.charAt(0).toUpperCase()}
                  </div>
                  {s.skill_name}
                </td>
                <td>{s.skill_type}</td>
                <td>
                  <div className="action-buttons">
                    <FiEdit2
                      className="edit-icon"
                      onClick={() => {
                        setSelectedSkill({...s});
                        setShowEdit(true);
                      }}
                    />
                    <FiTrash2
                      className="delete-icon"
                      onClick={() => deleteSkill(s.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ADD MODAL */}
{showAdd && (
  <>
    <style>
      {`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(5, 14, 30, 0.9);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #0f0f17;
          border: 0.1px solid #00e9fa;
          border-radius: 16px;
          padding: 20px 20px;
          width: 500px;
          height: auto;
          text-align: center;
          box-shadow: 0 4px 12px rgba(39, 226, 220, 0.3);
          margin: 0 10px 70px;
          font-size: 16px;
        }

        .modal-content h4 {
          margin-bottom: 15px;
          color: #3b9dff;
          font-size: 22px;
        }

        .modal-content input,
        .modal-content select {
          width: 90%;
          margin: 8px 0;
          padding: 8px;
          font-size: 16px;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .modal-actions button {
          flex: 1;
          margin: 0 10px;
          padding: 10px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          min-width: 22%;
        }

        .modal-actions button:first-child {
          background: #6c757d;
          color: #fff;
        }

        .modal-actions button:last-child {
          background: #14a6c0;
          color: #fff;
        }
          
      `}
    </style>

    <div className="modal-overlay" onClick={() => setShowAdd(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Add Skill</h4>

        <input
          placeholder="Skill Name"
          value={newSkill.skill_name}
          onChange={(e) =>
            setNewSkill({ ...newSkill, skill_name: e.target.value })
          }
        />

        <select
          value={newSkill.skill_type}
          onChange={(e) =>
            setNewSkill({ ...newSkill, skill_type: e.target.value })
          }
        >
          <option value="">Select Type</option>
          <option value="technical">Technical</option>
          <option value="non-technical">Non-Technical</option>
          <option value="soft-skill">Soft Skill</option>
        </select>

        <div className="modal-actions">
          <button onClick={() => setShowAdd(false)}>Cancel</button>
          <button onClick={addSkill}>Add</button>
        </div>
      </div>
    </div>
  </>
)}
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
      {/* EDIT MODAL */}
      {/* EDIT MODAL */}
{/* EDIT MODAL */}
{showEdit && selectedSkill && (
  <>
    <style>
      {`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(5, 14, 30, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #0f0f17;
          border: 0.1px solid #00e9fa;
          border-radius: 16px;
          padding: 20px 20px;
          width: 500px;
          height: auto;
          text-align: center;
          box-shadow: 0 4px 12px rgba(39, 226, 220, 0.3);
          margin: 0 10px 70px;
          font-size: 16px;
          animation: popup 0.25s ease;
        }

        .modal-content h4 {
          margin-bottom: 15px;
          color: #3b9dff;
          font-size: 22px;
        }

        .modal-content input,
        .modal-content select {
          width: 90%;
          margin: 8px 0;
          padding: 8px;
          font-size: 16px;
          border-radius: 4px;
          border: none;
          outline: none;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .modal-actions button {
          flex: 1;
          margin: 0 10px;
          padding: 10px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          min-width: 22%;
          font-size: 14px;
        }

        .modal-actions button:first-child {
          background: #6c757d;
          color: #fff;
        }

        .modal-actions button:last-child {
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Edit Skill</h4>

        <input
          placeholder="Skill Name"
          value={selectedSkill.skill_name}
          onChange={(e) =>
            setSelectedSkill({
              ...selectedSkill,
              skill_name: e.target.value
            })
          }
        />

        <select
          value={selectedSkill.skill_type}
          onChange={(e) =>
            setSelectedSkill({
              ...selectedSkill,
              skill_type: e.target.value
            })
          }
        >
          <option value="">Select Type</option>
          <option value="technical">Technical</option>
          <option value="non-technical">Non-Technical</option>
          <option value="soft-skill">Soft Skill</option>
        </select>

        <div className="modal-actions">
          <button onClick={() => setShowEdit(false)}>Cancel</button>
          <button onClick={updateSkill}>Save</button>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}

export default SkillsSection;