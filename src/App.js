import React, { useState } from "react";

function App() {
  const [abResults, setAbResults] = useState(null);
  const [optResults, setOptResults] = useState(null);

  const runAbTest = async () => {
    console.log("Running A/B Test...");
    try {
      const res = await fetch("https://ab-pricing-env.eba-ceeza7uv.us-east-1.elasticbeanstalk.com/api/ab-test");
      const data = await res.json();
      console.log("A/B Results:", data);
      setAbResults(data);
    } catch (err) {
      console.error("A/B Test failed:", err);
    }
  };

  const runOptimization = async () => {
    console.log("Running Optimization...");
    try {
      const res = await fetch("http://ab-pricing-env.eba-ceeza7uv.us-east-1.elasticbeanstalk.com/api/optimize-price");
      const data = await res.json();
      console.log("Optimization Results:", data);
      setOptResults(data);
    } catch (err) {
      console.error("Optimization failed:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pricing A/B Test & Optimizer</h2>
      <button onClick={runAbTest}>Run A/B Test</button>
      <button onClick={runOptimization}>Run Optimization</button>

      {abResults && (
        <div>
          <h3>A/B Test Results:</h3>
          <pre>{JSON.stringify(abResults, null, 2)}</pre>
        </div>
      )}

      {optResults && (
        <div>
          <h3>Optimization Results:</h3>
          <pre>{JSON.stringify(optResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
