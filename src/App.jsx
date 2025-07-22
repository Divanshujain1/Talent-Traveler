// App.jsx
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      
    </Routes>
  );
}

export default App;
