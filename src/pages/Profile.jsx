import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [step, setStep] = useState(2);
  const navigate = useNavigate();
  const [searchSkill, setSearchSkill] = useState("");

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    gender: "",
    education: {
      level: "",
      field: "",
      score: ""
    },
    skills: {
      tech: []
    },
    interests: []
  });

  const allSkills = [
    "Python","Java","JavaScript","SQL","Machine Learning",
    "Deep Learning","Data Analysis","React","Node.js",
    "Docker","Linux","AWS","Kubernetes","Pandas","NumPy"
  ];

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchSkill.toLowerCase())
  );

  // ================= FETCH =================
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast.error("❌ Please login first");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/academic-profile/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 404) return;

        if (res.status === 401) {
          toast.error("Session expired");
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        const data = await res.json();

        setProfile((prev) => ({
          ...prev,
          education: {
            level: data.highest_qualification || "",
            field: data.branch || "",
            score: data.cgpa || ""
          },
          skills: {
            tech: Array.isArray(data.skills_known)
              ? data.skills_known
              : []
          },
          interests: Array.isArray(data.interests)
            ? data.interests
            : []
        }));

      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  // ================= SAVE =================
  const handleFinish = async () => {

    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("❌ Please login first");
      navigate("/signin");
      return;
    }

    const loadingToast = toast.loading("Saving profile...");

    try {
      const cleanedSkills = (profile.skills.tech || []).filter(Boolean);
      const cleanedInterests = (profile.interests || []).filter(Boolean);

      if (!profile.education.level || !profile.education.field) {
        toast.update(loadingToast, {
          render: "❌ Fill education details",
          type: "error",
          isLoading: false
        });
        return;
      }

      if (cleanedSkills.length === 0) {
        toast.update(loadingToast, {
          render: "❌ Add at least one skill",
          type: "error",
          isLoading: false
        });
        return;
      }

      if (cleanedInterests.length === 0) {
        toast.update(loadingToast, {
          render: "❌ Select interest",
          type: "error",
          isLoading: false
        });
        return;
      }

      let cgpaValue = parseFloat(profile.education.score);
      if (isNaN(cgpaValue)) cgpaValue = 0;
      if (cgpaValue > 10) cgpaValue = cgpaValue / 10;

      const payload = {
        highest_qualification: profile.education.level,
        branch: profile.education.field,
        cgpa: cgpaValue,
        skills_known: cleanedSkills,
        interests: cleanedInterests
      };

      const res = await fetch("http://localhost:5000/academic-profile/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Backend error");
      }

      localStorage.setItem("profileData", JSON.stringify(profile));

      toast.update(loadingToast, {
        render: "Profile saved successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      setTimeout(() => {
        navigate("/profiledashboard");
      }, 1500);

    } catch (err) {
      toast.update(loadingToast, {
        render: err.message || "❌ Save failed",
        type: "error",
        isLoading: false
      });
    }
  };

  // ================= SKILLS =================
  const addSkill = (skill) => {
    if (!skill) return;

    if (!profile.skills.tech.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: {
          tech: [...prev.skills.tech, skill]
        }
      }));
    }
  };

  const removeSkill = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        tech: prev.skills.tech.filter((s) => s !== skill)
      }
    }));
  };

  return (
    <div className="container">

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      

      <h1>Complete Your Profile</h1>

      {/* rest of your code remains SAME */}

      <div className="stepper">
        {["Education", "Skills", "Interests"].map((label, i) => (
          <div className="step" key={i}>
            <div className={`circle ${step === i + 2 ? "active" : ""}`}>
              {i + 1}
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="glass">

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>Education</h2>

            <select
              value={profile.education.level}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  education: { ...profile.education, level: e.target.value }
                })
              }
            >
              <option value="">Education Level</option>
              <option>High School</option>
              <option>Diploma</option>
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>PhD</option>
            </select>

            <input
              placeholder="Field of Study"
              value={profile.education.field}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  education: { ...profile.education, field: e.target.value }
                })
              }
            />

            <input
              placeholder="CGPA / Percentage"
              value={profile.education.score}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  education: { ...profile.education, score: e.target.value }
                })
              }
            />

            <div className="actions">
              <button disabled>← Previous</button>
              <button onClick={() => setStep(3)}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2>Skills</h2>

            <input
              type="text"
              placeholder="Search skills..."
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />

            <div className="interest-grid">
              {filteredSkills.map((skill) => (
                <button
                  key={skill}
                  className="interest-pill"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>

            <h4>Selected Skills</h4>
            <div className="interest-grid">
              {(profile.skills.tech || []).map((skill) => (
                <button
                  key={skill}
                  className="interest-pill active"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ✕
                </button>
              ))}
            </div>

            <div className="actions">
              <button onClick={() => setStep(2)}>← Previous</button>
              <button onClick={() => setStep(4)}>Next →</button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2>Career Interest</h2>

            <div className="interest-grid">
              {[
                "Machine Learning Engineer","Data Scientist","Data Analyst",
                "Backend Developer","Software Engineer","DevOps Engineer",
                "Cloud Engineer","Cyber Security Analyst"
              ].map((interest) => (
                <button
                  key={interest}
                  className={`interest-pill ${
                    profile.interests.includes(interest) ? "active" : ""
                  }`}
                  onClick={() =>
                    setProfile({
                      ...profile,
                      interests: [interest]
                    })
                  }
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="actions">
              <button onClick={() => setStep(3)}>← Previous</button>
              <button onClick={handleFinish}>Finish →</button>
            </div>
        
          </>
          
        )}
          {/* 🔥 BACK BUTTON ADDED HERE */}
      <button
        onClick={() => navigate("/profiledashboard")}
        style={{
          padding: "10px 15px",
          background: "#805cdb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          margin: "20px 350px"
        }}
      >
        ⬅ Back to Dashboard
      </button>
      </div>
    </div>
  );
}