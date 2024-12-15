import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "50px", textAlign: "center", height: "100vh" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Welcome to the Quiz App
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" paragraph>
            Test your knowledge and challenge yourself with a variety of
            quizzes!
          </Typography>
        </Grid>
        <Grid item>
          <Box my={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ marginRight: "10px" }}
            >
              Login
            </Button>
            <Button variant="outlined" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="text.secondary" paragraph>
            Explore different categories, track your scores, and compete with
            friends!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="text.secondary">
            Join us today and start your quiz journey!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
