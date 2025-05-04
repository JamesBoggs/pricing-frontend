import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});

function App() {
  const [variant, setVariant] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = (v) => {
    setVariant(v);
    setResult(null);
    setError(null);
  };

  const handleOptimize = async () => {
    if (!variant) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/optimize-price?variant=${variant}`);
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
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Pricing A/B Test & Optimizer
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          <Button
            variant={variant === 'A' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleSelect('A')}
          >
            Variant A
          </Button>
          <Button
            variant={variant === 'B' ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => handleSelect('B')}
          >
            Variant B
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" mb={2}>
          <Button
            variant="contained"
            disabled={!variant || loading}
            onClick={handleOptimize}
            size="large"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Optimization'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Optimization Results:
              </Typography>
              <Typography>
                <strong>Variant:</strong> {variant}
              </Typography>
              <Typography>
                <strong>Best Price:</strong> ${result.best_price.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Expected Revenue:</strong> ${result.expected_revenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
