import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./UsersSection.css";
import { toast } from "react-toastify";
import { authFetch } from "../utils/refreshToken";
const API_URL = `${import.meta.env.VITE_API_URL}/users/`;

function UsersSection() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user"
  });

  // =========================
  // FETCH USERS (FIXED)
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");

      const res = await authFetch(API_URL, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      // 🔥 IMPORTANT: adjust based on backend response
      setUsers(data.users || data);  
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // DELETE USER
  // =========================
  const [showDelete, setShowDelete] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);

  const deleteUser = async (id) => {
    try {
    //   const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    // if (!confirmDelete) return;
      const token = localStorage.getItem("access_token");

      await authFetch(`${API_URL}${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      toast.success("User deleted");
      fetchUsers();

    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  

  // =========================
  // UPDATE USER
  // =========================
  const updateUser = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const res = await authFetch(`${API_URL}${selectedUser.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(selectedUser)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Update failed");
    }

    toast.success(data.message || "User updated");

    setShowEdit(false);
    fetchUsers();

  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};


  // =========================
  // FILTER + PAGINATION
  // =========================
  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = page * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="users-section">

      <div className="users-header">
        <h3 className="section-title">Users Management</h3>

        {/* <button
          className="add-user-btn"
          onClick={() => setShowAdd(true)}
        >
          Add User
        </button> */}
      </div>

      <input
        className="users-search"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
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
            currentUsers.map(u => (
              <tr key={u.user_id}>

                <td className="user-cell">
                  <div className="avatar">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>{u.name}</span>
                </td>

                <td>{u.email}</td>

                <td>
                  <span className={`role-badge role-${u.role}`}>
                    {u.role}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">

                    <FiEdit2
                      className="edit-icon"
                      onClick={() => {
                        setSelectedUser(u);
                        setShowEdit(true);
                      }}
                    />

                    <FiTrash2
                      className="delete-icon"
                      onClick={() => deleteUser(u.user_id)}
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

      {/* ADD + EDIT MODALS remain SAME (no change needed) */}
{showEdit && selectedUser && (
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
  border: 0.1px solid #00e9fa;   /* corrected border */
  border-radius: 16px;
  
  padding: 20px 20px;
  width: 500px;
  height: 300px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(39, 226, 220, 0.3);
  margin: 0 10px 70px;
  font-size: 35px;
}

        .modal-content h4 {
          margin-bottom: 15px;
          color: #3b9dff;
        
        }
        .modal-content input {
          width: 90%;
          margin: 8px 0;
          padding: 8px;
            font-size : 18px;
          border-radius: 4px;
    
        }
        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .modal-actions button {
          flex: 1;
          margin:  0 70px;
          padding: 10px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          min-width : 22%;
        }
        .modal-actions button:first-child {
          background: #14a6c0;
          color: #fff;
          
        }
        .modal-actions button:last-child {
          background: #6c757d;
          color: #fff;
        }
      `}
    </style>

    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Edit User</h4>

        <input
          type="text"
          value={selectedUser.name}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          type="email"
          value={selectedUser.email}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, email: e.target.value })
          }
          placeholder="Email"
        />

        <div className="modal-actions">
          <button onClick={updateUser}>Save</button>
          <button onClick={() => setShowEdit(false)}>Cancel</button>
        </div>
      </div>
    </div>
  </>
)}


    </div>
  );
}

export default UsersSection;