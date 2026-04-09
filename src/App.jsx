import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ===================== AUTH ===================== */
import PrivateRoute from "./components/PrivateRoute";

/* ===================== PUBLIC PAGES ===================== */
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

/* ===================== USER PAGES ===================== */
import Profile from "./pages/Profile";
import ProfileDashboard from "./pages/ProfileDashboard";
import Prediction from "./pages/prediction"; // ✅ ADDED
import History from "./pages/History";

/* ===================== LAYOUT ===================== */
import MainLayout from "./layout/MainLayout";

/* ===================== APP PAGES ===================== */
import CareerDetails from "./pages/CareerDetails";
import SkillInput from "./pages/SkillInput";
import CareerPrediction from "./pages/CareerPrediction";
import SkillGap from "./pages/SkillGap";
import Paths from "./pages/Paths";
import CareerRoles from "./pages/CareerRoles";
import Roadmaps from "./pages/Roadmaps";
import RoadmapDetail from "./pages/RoadmapDetail";
import Resources from "./pages/Resources";

/* ===================== ADMIN PAGES ===================== */
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/AdminDashboard";
import UsersSection from "./sections/UsersSection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================== PUBLIC ===================== */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ===================== PROTECTED ===================== */}

        {/* PROFILE FORM */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* PROFILE DASHBOARD */}
        <Route
          path="/profiledashboard"
          element={
            <PrivateRoute>
              <ProfileDashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ PREDICTION ROUTE */}
        <Route
          path="/prediction"
          element={
            <PrivateRoute>
              <Prediction />
            </PrivateRoute>
          }
        />

        <Route path="/history" element={<History />} />
        {/* ===================== APP ===================== */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="about" replace />} />
          <Route path="about" element={<About />} />
          <Route path="career/:id" element={<CareerDetails />} />
          <Route path="skill-input" element={<SkillInput />} />
          <Route path="career-prediction" element={<CareerPrediction />} />
          <Route path="skill-gap/:career_id" element={<SkillGap />} />
          <Route path="paths" element={<Paths />} />
          <Route path="paths/:id" element={<CareerRoles />} />
          <Route path="roadmaps" element={<Roadmaps />} />
          <Route path="roadmapDetail/:career_id" element={<RoadmapDetail />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* ===================== ADMIN ===================== */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UsersSection />
            </PrivateRoute>
          }
        />

        {/* ===================== FALLBACK ===================== */}
        <Route
          path="*"
          element={<h2 style={{ padding: 40 }}>Page Not Found</h2>}
        />

      </Routes>
    </BrowserRouter>
  );
}