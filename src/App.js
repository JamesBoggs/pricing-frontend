import React, { useState } from 'react';

function App() {
  const [abTest, setAbTest] = useState(null);
  const [optimization, setOptimization] = useState(null);

  const runABTest = async () => {
    const res = await 
fetch("https://ab-pricing-env.eba-ceeza7uv.us-east-1.elasticbeanstalk.com/api/optimize-price")
;
    const data = await res.json();
    setAbTest(data);
  };

  const runOptimization = async () => {
    const res = await 
fetch("http://ab-pricing-env.eba-ceeza7uv.us-east-1.elasticbeanstalk.com/api/optimize-price")
;
    const data = await res.json();
    setOptimization(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Pricing A/B Test & Optimizer</h1>

      <button onClick={runABTest}>Run A/B Test</button>
      {abTest && (
        <div>
          <h2>A/B Test Results</h2>
          {abTest.results.map((r, i) => (
            <p key={i}>
              Price ${r.price}: {r.conversions} conversions, Revenue: ${r.revenue.toFixed(2)}
            </p>
          ))}
          <strong>Best Price: ${abTest.best_price}</strong>
        </div>
      )}

      <hr />

      <button onClick={runOptimization}>Run Optimization</button>
      {optimization && (
        <div>
          <h2>Bayesian Optimization</h2>
          <p>Optimal Price: ${optimization.best_price.toFixed(2)}</p>
          <p>Expected Revenue: ${optimization.expected_revenue.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
