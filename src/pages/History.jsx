import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";

export default function History() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profileData"));
    const user = JSON.parse(localStorage.getItem("user"));

    setProfile({
      ...data,
      fullName: data?.fullName || user?.name || "",
      email: data?.email || user?.email || "",
      gender: data?.gender || "",
      education: {
        level: data?.education?.level || "",
        field: data?.education?.field || "",
        score: data?.education?.score || ""
      },
      avatar: data?.avatar || ""
    });
  }, []);

  // ✅ HANDLE GENDER CHANGE
  const handleChange = (value) => {
    setProfile((prev) => ({
      ...prev,
      gender: value
    }));
  };

  // ✅ IMAGE UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result
      }));
    };

    if (file) reader.readAsDataURL(file);
  };

  // ✅ SAVE
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
    setIsEditing(false);
  };

  if (!profile) return <p style={{ color: "white" }}>Loading...</p>;

  // ✅ FALLBACK AVATAR (ANIMATED STYLE)
  const avatarSrc =
    profile.avatar ||
    `https://api.dicebear.com/7.x/adventurer/svg?seed=${profile.fullName}`;

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>My Profile</h2>
        <p style={styles.subtitle}>Manage your account details</p>
      </div>

      {/* CARD */}
      <div style={styles.card}>

        {/* LEFT */}
        <div style={styles.left}>
          <img src={avatarSrc} alt="profile" style={styles.avatar} />

          {/* ✅ UPLOAD ONLY IN EDIT MODE */}
          {isEditing && (
            <input type="file" onChange={handleImage} style={styles.file} />
          )}

          <h3 style={styles.name}>{profile.fullName}</h3>
          <p style={styles.email}>{profile.email}</p>

          {/* BUTTON TOGGLE */}
          {!isEditing ? (
            <button
              style={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              style={styles.saveBtn}
              onClick={handleSave}
            >
              Save Profile
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          {/* GENDER */}
          <div style={styles.row}>
            <span style={styles.label}>Gender</span>

            {isEditing ? (
              <select
                style={styles.select}
                value={profile.gender}
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <span style={styles.value}>
                {profile.gender || "Not set"}
              </span>
            )}
          </div>

          {/* EDUCATION */}
          <div style={styles.row}>
            <span style={styles.label}>Education Level</span>
            <span style={styles.value}>
              {profile.education.level || "N/A"}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Field</span>
            <span style={styles.value}>
              {profile.education.field || "N/A"}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Score</span>
            <span style={styles.value}>
              {profile.education.score || "N/A"}
            </span>
          </div>

        </div>
      </div>

      {/* BACK */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/profiledashboard")}
      >
        ← Back
      </button>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "radial-gradient(circle at top, #1e1b4b, #020617)",
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    background: "linear-gradient(90deg,#38bdf8,#a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    color: "#cbd5f5",
  },

  card: {
    display: "flex",
    borderRadius: "20px",
    padding: "30px",
    gap: "40px",
    maxWidth: "900px",
    margin: "auto",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },

  left: {
    flex: 1,
    textAlign: "center",
  },

  avatar: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    border: "3px solid #7c3aed",
    marginBottom: "15px",
    transition: "0.3s",
  },

  file: {
    marginBottom: "10px",
    color: "white",
  },

  name: {
    fontSize: "20px",
    fontWeight: "600",
  },

  email: {
    color: "#cbd5f5",
    fontSize: "14px",
    marginBottom: "10px",
  },

  editBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#7c3aed,#4f46e5)",
    color: "white",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
  },

  right: {
    flex: 2,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "12px",
    background: "rgba(255,255,255,0.08)",
  },

  label: {
    color: "#cbd5f5",
  },

  value: {
    fontWeight: "600",
  },

  select: {
    padding: "6px",
    borderRadius: "6px",
    border: "none",
  },

  backBtn: {
    marginTop: "30px",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#7c3aed,#4f46e5)",
    color: "white",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};