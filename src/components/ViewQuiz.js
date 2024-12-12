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

const ViewQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quizzes/${quizId}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  if (!quiz) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        {quiz.title}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Questions:
      </Typography>
      <List>
        {quiz.questions.map((question, index) => (
          <ListItem key={index}>
            <Paper elevation={2} sx={{ padding: 2, width: "100%" }}>
              <ListItemText
                primary={`Q${index + 1}: ${question.questionText}`}
                secondary={
                  <Box>
                    {question.options.map((option, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          backgroundColor:
                            option === question.correctAnswer
                              ? "#c8e6c9"
                              : "#ffffff",
                          padding: 1,
                          borderRadius: 1,
                          margin: "0.2rem 0",
                          border:
                            option === question.correctAnswer
                              ? "1px solid #4caf50"
                              : "1px solid transparent",
                        }}
                      >
                        - {option}
                      </Typography>
                    ))}
                  </Box>
                }
              />
            </Paper>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/admin-dashboard")}
        sx={{ marginTop: 2 }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default ViewQuiz;
