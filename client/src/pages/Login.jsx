import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/auth/register" : "/auth/login";
      const { data } = await api.post(url, form);
      localStorage.setItem("token", data.token);
      navigate("/analyze");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Resume Analyzer</h1>
      <div className="card auth-card" style={{ marginTop: 20 }}>
        <h2>{isRegister ? "Create account" : "Welcome back"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input name="name" placeholder="Name" onChange={handleChange} />
          )}
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          {error && <p className="error">{error}</p>}
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
          <button type="button" className="link-btn" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Have an account? Login" : "New here? Register"}
          </button>
        </form>
      </div>
    </div>
  );
}