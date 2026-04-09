import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";
import "./ResourcesSection.css";
import {toast} from "react-toastify";
function ResourcesSection() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const [page, setPage] = useState(1);
  const resourcesPerPage = 5;

  const [newResource, setNewResource] = useState({
    resource_title: "",
    resource_type: "",
    roadmap_id: "",
    resource_link: ""
  });

  const fetchResources = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/resources/`)
      .then(res => res.json())
      .then(data => {
        setResources(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const deleteResource = (id) => {
    fetch(`http://localhost:5000/resources/${id}`, { method: "DELETE" })
      .then(() => fetchResources());
      toast.success("Deleted Resource");
  };

  const addResource = () => {
    fetch("http://localhost:5000/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResource)
    }).then(() => {
      setShowAdd(false);
      fetchResources();
      setNewResource({ resource_title: "", resource_type: "", roadmap_id: "", resource_link: "" });
    });
    toast.success("Resource Added");
  };

  const updateResource = () => {
    fetch(`http://localhost:5000/resources/${selectedResource.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedResource)
    }).then(() => {
      setShowEdit(false);
      fetchResources();
    });
    toast.success("Updated Resource");
  };

  const filtered = resources.filter(r =>
    r.resource_title.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = page * resourcesPerPage;
  const firstIndex = lastIndex - resourcesPerPage;
  const current = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / resourcesPerPage);

  return (
    <div className="resources-section">
      <div className="resources-header">
        <h3 className="section-title">Resources Management</h3>
        <button className="add-resource-btn" onClick={() => setShowAdd(true)}>
          Add Resource
        </button>
      </div>

      <input
        className="resources-search"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="resources-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Roadmap Step</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <tr key={i}>
                <td colSpan="5"><div className="skeleton-row"></div></td>
              </tr>
            ))
          ) : (
            current.map(r => (
              <tr key={r.id}>
                <td>{r.resource_title}</td>
                <td><span className="type-badge">{r.resource_type}</span></td>
                <td>{r.roadmap_id}</td>
                <td>
                  <a href={r.resource_link} target="_blank" rel="noreferrer" className="resource-link">
                    Open <FiExternalLink />
                  </a>
                </td>
                <td>
                  <div className="action-buttons">
                    <FiEdit2
                      className="edit-icon"
                      onClick={() => { setSelectedResource(r); setShowEdit(true); }}
                    />
                    <FiTrash2
                      className="delete-icon"
                      onClick={() => deleteResource(r.id)}
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

      {/* ADD MODAL */}
    {/* ADD RESOURCE MODAL */}
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
        <h3>Add Resource</h3>

        <div className="modal-form">
          <input
            className="modal-input"
            placeholder="Title"
            value={newResource.resource_title}
            onChange={(e) =>
              setNewResource({
                ...newResource,
                resource_title: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Type (Video/Course/Article)"
            value={newResource.resource_type}
            onChange={(e) =>
              setNewResource({
                ...newResource,
                resource_type: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Roadmap Step ID"
            value={newResource.roadmap_id}
            onChange={(e) =>
              setNewResource({
                ...newResource,
                roadmap_id: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Resource Link"
            value={newResource.resource_link}
            onChange={(e) =>
              setNewResource({
                ...newResource,
                resource_link: e.target.value
              })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={() => setShowAdd(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={addResource}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </>
)}

      {/* EDIT MODAL */}
      {/* EDIT RESOURCE MODAL */}
{showEdit && selectedResource && (
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
        <h3>Edit Resource</h3>

        <div className="modal-form">
          <input
            className="modal-input"
            placeholder="Title"
            value={selectedResource.resource_title}
            onChange={(e) =>
              setSelectedResource({
                ...selectedResource,
                resource_title: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Type (Video/Course/Article)"
            value={selectedResource.resource_type}
            onChange={(e) =>
              setSelectedResource({
                ...selectedResource,
                resource_type: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Roadmap Step ID"
            value={selectedResource.roadmap_id}
            onChange={(e) =>
              setSelectedResource({
                ...selectedResource,
                roadmap_id: e.target.value
              })
            }
          />

          <input
            className="modal-input"
            placeholder="Resource Link"
            value={selectedResource.resource_link}
            onChange={(e) =>
              setSelectedResource({
                ...selectedResource,
                resource_link: e.target.value
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
            onClick={updateResource}
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

export default ResourcesSection;
