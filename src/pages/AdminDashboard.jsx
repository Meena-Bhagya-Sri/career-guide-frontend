import { useState } from "react";
import { useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import AnalyticsChart from "../components/AnalyticsChart";

import UsersSection from "../sections/UsersSection";
import SkillsSection from "../sections/SkillsSection";
import CareersSection from "../sections/CareersSection";
import RoadmapsSection from "../sections/RoadmapsSection";
import ResourcesSection from "../sections/ResourcesSection";

function AdminDashboard() {

  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const goBackDashboard = () => {
    setActiveSection("dashboard");
  };
  const [stats,setStats] = useState({
  total_users:0,
  total_skills:0,
  total_careers:0,
  total_roadmaps:0,
  total_resources:0
});
 useEffect(() => {

  const fetchStats = async () => {

    try {

      const response = await API.get("/admin/dashboard");

      setStats(response.data);

    } catch (err) {

      console.error("Dashboard error:", err);

    }

  };

  fetchStats();

}, []);
  return (
    <div className={darkMode ? "dashboard-page dark" : "dashboard-page"}>

      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />

      <div className="dashboard-content">

        {/* DASHBOARD CARDS */}
        <DashboardCards
  setActiveSection={setActiveSection}
  activeSection={activeSection}
   stats={stats}
/>

        {/* DASHBOARD ANALYTICS */}
        {activeSection === "dashboard" && (
          <AnalyticsChart darkMode={darkMode} />
        )}
        

        {/* USERS */}
        {activeSection === "users" && (
          <>
            <div className="dashboard-breadcrumb">
              <span
                className="breadcrumb-link"
                onClick={goBackDashboard}
              >
                Dashboard
              </span>

              <span className="breadcrumb-separator"> / </span>

              <span className="breadcrumb-current">
                Users
              </span>
            </div>

            <UsersSection />
          </>
        )}

        {/* SKILLS */}
        {activeSection === "skills" && (
          <>
            <div className="dashboard-breadcrumb">
              <span
                className="breadcrumb-link"
                onClick={goBackDashboard}
              >
                Dashboard
              </span>

              <span className="breadcrumb-separator"> / </span>

              <span className="breadcrumb-current">
                Skills
              </span>
            </div>

            <SkillsSection />
          </>
        )}

        {/* CAREERS */}
        {activeSection === "careers" && (
          <>
            <div className="dashboard-breadcrumb">
              <span
                className="breadcrumb-link"
                onClick={goBackDashboard}
              >
                Dashboard
              </span>

              <span className="breadcrumb-separator"> / </span>

              <span className="breadcrumb-current">
                Careers
              </span>
            </div>

            <CareersSection />
          </>
        )}

        {/* ROADMAPS */}
        {activeSection === "roadmaps" && (
          <>
            <div className="dashboard-breadcrumb">
              <span
                className="breadcrumb-link"
                onClick={goBackDashboard}
              >
                Dashboard
              </span>

              <span className="breadcrumb-separator"> / </span>

              <span className="breadcrumb-current">
                Roadmaps
              </span>
            </div>

            <RoadmapsSection />
          </>
        )}

        {/* RESOURCES */}
        {activeSection === "resources" && (
          <>
            <div className="dashboard-breadcrumb">
              <span
                className="breadcrumb-link"
                onClick={goBackDashboard}
              >
                Dashboard
              </span>

              <span className="breadcrumb-separator"> / </span>

              <span className="breadcrumb-current">
                Resources
              </span>
            </div>

            <ResourcesSection />
          </>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;