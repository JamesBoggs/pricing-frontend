import React, { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/optimize-price");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Pricing A/B Test & Optimizer</h1>
      <div className="buttons">
        <button onClick={handleOptimize} disabled={loading}>
          {loading ? "Optimizing…" : "Run Optimization"}
        </button>
      </div>

      {error && <p className="error">Error: {error}</p>}

      {result && (
        <div className="result">
          <h3>Optimization Results:</h3>
          <p>
            <strong>Best Price:</strong> ${result.best_price.toFixed(2)}
          </p>
          <p>
            <strong>Expected Revenue:</strong> ${result.expected_revenue.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
