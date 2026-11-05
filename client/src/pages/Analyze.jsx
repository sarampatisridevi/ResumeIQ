import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("resume", file);
      fd.append("jobDescription", jd);
      const { data } = await api.post("/analyze", fd);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="nav">
        <Link to="/history">View history</Link>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="card">
        <h2>Analyze Resume</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
          <textarea
            rows="8"
            placeholder="Paste job description here"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          <button disabled={loading || !file || !jd}>
            {loading ? "Analyzing... (can take up to a minute)" : "Analyze"}
          </button>
        </form>
        {error && <p className="error" style={{ marginTop: 12 }}>{error}</p>}
      </div>
      {result && (
        <div className="card" style={{ marginTop: 20 }}>
          <Result data={result} />
        </div>
      )}
    </div>
  );
}

export function Result({ data }) {
  const level = data.score >= 70 ? "score-high" : data.score >= 40 ? "score-mid" : "score-low";
  return (
    <div>
      <div className={`score-circle ${level}`}>{data.score}</div>
      <div className="section strengths">
        <h4>Strengths</h4>
        <ul>{data.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
      <div className="section missing">
        <h4>Missing Skills</h4>
        <ul>{data.missingSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
      <div className="section suggestions">
        <h4>Suggestions</h4>
        <ul>{data.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
    </div>
  );
}