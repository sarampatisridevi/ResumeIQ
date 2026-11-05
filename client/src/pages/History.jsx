import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Result } from "./Analyze";

export default function History() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/analyze").then((res) => setList(res.data));
  }, []);

  return (
    <div className="container">
      <div className="nav">
        <Link to="/analyze">← Back</Link>
      </div>
      <div className="card">
        <h2>Past Analyses</h2>
        {list.length === 0 && <p>No analyses yet.</p>}
        {list.map((a) => (
          <details key={a._id}>
            <summary>
              {a.fileName} · {a.score}/100 · {new Date(a.createdAt).toLocaleDateString()}
            </summary>
            <Result data={a} />
          </details>
        ))}
      </div>
    </div>
  );
}