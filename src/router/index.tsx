import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
// import LoginPage from "../features/auth/pages/LoginPage";

// DASHBOARD
import StressTestingModelPage from "@/features/dashboard/pages/StressTestingModelPage";
// import ProfilePage from "../features/profile/pages/ProfilePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Protected pages */}
        <Route path="/" element={<StressTestingModelPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
