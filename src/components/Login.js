import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext"; // Import your user context

const Login = () => {
  const { login } = useUser(); // Get the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://quiz-app-backend-1-g8ew.onrender.com/api/auth/login",
        { email, password }
      );

      // Use context to set user info
      login({
        token: response.data.token,
        userId: response.data.userId,
        role: response.data.role,
      });

      // Redirect based on user role
      navigate(
        response.data.role === "admin" ? "/admin-dashboard" : "/dashboard"
      );
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "Login failed. Please check your credentials."
        );
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email" // Ensure email type for validation
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </Container>
  );
};

export default Login;
