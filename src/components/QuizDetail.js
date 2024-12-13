import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const QuizDetail = () => {
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://quiz-app-backend-1-g8ew.onrender.com/api/quizzes/${quizId}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  if (!quiz) return <Typography>Loading...</Typography>; // Handle loading state

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        {quiz.title}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Questions:
      </Typography>
      <List>
        {quiz.questions.map((question, index) => {
          const isCorrect = question.userAnswer === question.correctAnswer;

          return (
            <ListItem key={index}>
              <Paper elevation={2} style={{ padding: "1rem", width: "100%" }}>
                <ListItemText
                  primary={`Q${index + 1}: ${question.questionText}`}
                  secondary={
                    <Box>
                      {question.options.map((option, idx) => {
                        const isSelected = option === question.userAnswer;
                        return (
                          <Typography
                            key={idx}
                            variant="body2"
                            style={{
                              backgroundColor: isSelected
                                ? isCorrect
                                  ? "#c8e6c9" // Light green for correct answers
                                  : "#ffccbc" // Light red for incorrect answers
                                : option === question.correctAnswer
                                ? "#e3f2fd" // Light blue for correct options (not selected)
                                : "#ffffff", // White for other options
                              padding: "0.5rem",
                              borderRadius: "4px",
                              margin: "0.2rem 0",
                              border: isSelected
                                ? isCorrect
                                  ? "1px solid #4caf50" // Green border for correct answers
                                  : "1px solid #f44336" // Red border for incorrect answers
                                : option === question.correctAnswer
                                ? "1px solid #2196f3" // Blue border for correct options
                                : "1px solid transparent",
                            }}
                          >
                            - {option}
                          </Typography>
                        );
                      })}
                    </Box>
                  }
                />
              </Paper>
            </ListItem>
          );
        })}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/progress")}
        style={{ marginTop: "1rem" }}
      >
        Back to Progress
      </Button>
    </Container>
  );
};

export default QuizDetail;
