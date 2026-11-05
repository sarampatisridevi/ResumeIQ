import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Analyze from "./pages/Analyze";
import History from "./pages/History";

const Protected = ({ children }) =>
  localStorage.getItem("token") ? children : <Navigate to="/" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/analyze" element={<Protected><Analyze /></Protected>} />
        <Route path="/history" element={<Protected><History /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}