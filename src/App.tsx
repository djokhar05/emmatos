import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grain } from "./components/Grain.tsx";
import { Landing } from "./pages/Landing.tsx";
import { AdminLogin } from "./pages/AdminLogin.tsx";
import { AdminDashboard } from "./pages/AdminDashboard.tsx";
import { MemberLogin } from "./pages/MemberLogin.tsx";
import { MemberDashboard } from "./pages/MemberDashboard.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Grain />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="member/login" element={<MemberLogin />} />
        <Route path="member/dashboard" element={<MemberDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
