import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditQuiz = () => {
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

  const handleUpdateQuiz = async () => {
    if (!quiz.title || !quiz.questions || quiz.questions.length === 0) {
      alert("Please ensure all fields are filled out.");
      return;
    }

    for (const question of quiz.questions) {
      if (
        !question.questionText ||
        !question.correctAnswer ||
        question.options.length === 0
      ) {
        alert(
          "Each question must have a question text, correct answer, and at least one option."
        );
        return;
      }
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://quiz-app-backend-1-g8ew.onrender.com/api/quizzes/${quizId}`,
        quiz,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.push(""); // Add a new empty option
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  if (!quiz) return <Typography>Loading...</Typography>; // Handle loading state

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Edit Quiz
      </Typography>

      <TextField
        label="Quiz Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        fullWidth
        margin="normal"
      />

      {quiz.questions.map((question, questionIndex) => (
        <Box key={questionIndex} sx={{ marginBottom: 2 }}>
          <TextField
            label={`Question ${questionIndex + 1}`}
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(
                questionIndex,
                "questionText",
                e.target.value
              )
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(
                questionIndex,
                "correctAnswer",
                e.target.value
              )
            }
            fullWidth
            margin="normal"
          />

          <Typography variant="h6" gutterBottom>
            Options
          </Typography>
          {question.options.map((option, optionIndex) => (
            <TextField
              key={optionIndex}
              label={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(questionIndex, optionIndex, e.target.value)
              }
              fullWidth
              margin="normal"
            />
          ))}

          <Button
            variant="outlined"
            color="primary"
            onClick={() => addOption(questionIndex)}
            sx={{ marginTop: 1 }}
          >
            Add Option
          </Button>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateQuiz}
        sx={{ marginTop: 2 }}
      >
        Update Quiz
      </Button>
    </Container>
  );
};

export default EditQuiz;
