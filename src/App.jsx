// App.jsx
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import PostProject from "./pages/PostProject";
import ProjectListings from "./pages/ProjectListings";
import ProjectDetails from "./pages/ProjectDetails";
import UserRoleSelection from "./pages/UserRoleSelection";
import FreelancerProposal from "./pages/FreelancerProposal";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/PostProject" element={<PostProject />} />
      <Route path="/ProjectListings" element={<ProjectListings />} />
      <Route path="/ProjectDetails" element={<ProjectDetails />} />
      <Route path="/project-details/:id" element={<ProjectDetails />} />
      <Route path="/UserRoleSelection" element={<UserRoleSelection />} />
      <Route path="/FreelancerProposal" element={<FreelancerProposal />} />
    </Routes>
  );
}

export default App;
