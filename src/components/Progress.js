import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve the user ID from local storage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!userId) {
        console.error("User ID not found");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://quiz-app-backend-1-g8ew.onrender.com/api/progress/${userId}`
        );
        console.log("Fetched progress data:", response.data); // Log the response
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [navigate, userId]);

  const handleDeleteProgress = async (progressId) => {
    try {
      await axios.delete(
        `https://quiz-app-backend-1-g8ew.onrender.com/api/progress/${progressId}`
      );
      // Update state to remove the deleted progress
      setProgressData(progressData.filter((quiz) => quiz._id !== progressId));
    } catch (error) {
      console.error("Error deleting progress:", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Your Progress
        </Typography>
        <Grid container spacing={2}>
          {progressData.map((quiz) => (
            <Grid item xs={12} key={quiz._id}>
              <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
                <Typography
                  variant="h6"
                  style={{ cursor: "pointer", color: "#3f51b5" }}
                  onClick={() => {
                    if (quiz.quizId) {
                      navigate(`/quiz-detail/${quiz.quizId._id}`);
                    } else {
                      console.error("Quiz ID is missing");
                    }
                  }}
                >
                  {quiz.quizId ? quiz.quizId.title : "Quiz Title Unavailable"}
                </Typography>
                <Typography variant="body2">
                  Category: {quiz.categoryId?.name || "No category"}{" "}
                </Typography>
                <Typography variant="body1">Score: {quiz.score}</Typography>
                <Typography variant="body2">
                  Date Completed: {new Date(quiz.date).toLocaleDateString()}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteProgress(quiz._id)}
                  style={{ marginTop: "1rem" }}
                >
                  Delete Progress
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Progress;
