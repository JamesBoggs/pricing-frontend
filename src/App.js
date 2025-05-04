import React, { useState } from "react";

function App() {
  const [abResults, setAbResults] = useState(null);
  const [optResult, setOptResult] = useState(null);

  const runAbTest = async () => {
    try {
      const res = await 
fetch("https://ab-pricing-env.eba-ceeza7uv.us-east-1.elasticbeanstalk.com/api/ab-test");
      const data = await res.json();
      setAbResults(data);
    } catch (err) {
      console.error("A/B Test failed:", err);
    }
  };

  const runOptimization = async () => {
    try {
      const res = await 
fetch("https://ab-pricing-env.eba-ceeza7uv.us-east-1.elasticbeanstalk.com/api/optimize-price");
      const data = await res.json();
      setOptResult(data);
    } catch (err) {
      console.error("Optimization failed:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pricing A/B Test & Optimizer</h1>
      <button onClick={runAbTest}>Run A/B Test</button>
      <button onClick={runOptimization} style={{ marginLeft: "1rem" }}>
        Run Optimization
      </button>

      {abResults && (
        <div style={{ marginTop: "2rem" }}>
          <h2>A/B Test Results</h2>
          <pre>{JSON.stringify(abResults, null, 2)}</pre>
        </div>
      )}

      {optResult && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Optimized Price</h2>
          <pre>{JSON.stringify(optResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

