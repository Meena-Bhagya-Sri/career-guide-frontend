import { useState } from "react";

const roadmapList = [
  "AI-Agents","AI-Data-Scientist","AI-Engineer","Angular","API-Design",
  "Aspnet-Core","AWS","Backend","BI-Analyst","CloudFlare",
  "Computer-Science","CPP","CSS","Cyber-Security","Data-Analyst",
  "Data-Engineer","DataStructures-And-Algorithms","Design-System",
  "DevOps","Docker","Flutter","Frontend","Full-Stack",
  "Game-Developer","Git-GitHub","Golang","HTML","Java",
  "JavaScript","Linux","Machine-Learning","Mlops","MongoDB",
  "NextJS","NodeJS","PHP","Prompt-Engineering","Python",
  "QA","React-Native","React","Rust","Software-Architect",
  "Software-Design-Architecture","Spring-Boot","SQL",
  "System-Design","TypeScript","UX-Design","VUE","WordPress",
];

export default function Roadmaps() {
  const [search, setSearch] = useState("");

  const openPDF = (title) => {
    const fileName = title + ".pdf";
    window.open(`/Revised Roadmaps/${fileName}`, "_blank");
  };

  const filteredList = roadmapList.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* ✅ SAFE CSS ANIMATION */}
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        `}
      </style>

      <h2 style={styles.title}>Explore Roadmaps</h2>

      <input
        type="text"
        placeholder="Search roadmap..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {filteredList.map((item, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => openPDF(item)}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-8px) scale(1.03)";
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background =
                "rgba(255,255,255,0.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.3)";
            }}
          >
            <span style={styles.text}>{item}</span>
            <span style={styles.arrow}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    color: "white",
    background:
      "linear-gradient(135deg, #020617, #0f172a, #020617)",
  },

  title: {
    fontSize: "34px",
    marginBottom: "20px",
    fontWeight: "700",
    background:
      "linear-gradient(270deg, #38bdf8, #a78bfa, #22d3ee, #38bdf8)",
    backgroundSize: "600% 600%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientMove 6s ease infinite",
  },

  search: {
    width: "100%",
    maxWidth: "400px",
    padding: "12px 16px",
    marginBottom: "25px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    backdropFilter: "blur(10px)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    backdropFilter: "blur(14px)",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "18px",
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.12)",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
  },

  text: {
    fontSize: "14px",
    fontWeight: "500",
  },

  arrow: {
    opacity: 0.6,
    fontSize: "18px",
  },
};