import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://quiz-app-backend-1-g8ew.onrender.com/api/quizzes/${quizId}`
        );
        setQuiz(response.data);
        setTimeLeft(response.data.questions.length * 60); // 1 minute per question
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setErrorMessage(
          "Quiz not found. Please check the quiz ID or try again later."
        ); // Set error message
        navigate("/dashboard"); // Redirect to a safe route
      }
    };

    fetchQuiz();
  }, [quizId, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit(); // Automatically submit when time is up
    }
  }, [timeLeft]);

  const handleChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    setLoading(true);
    let score = 0;

    quiz.questions.forEach((question) => {
      const userAnswer = answers[question._id];
      if (userAnswer === question.correctAnswer) {
        score++;
      }
    });

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to submit your results.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        "https://quiz-app-backend-1-g8ew.onrender.com/api/result",
        {
          quizId: quiz._id,
          score,
          totalQuestions: quiz.questions.length,
          date: new Date(),
          categoryId: quiz.categoryId,
        },
        config
      );

      setSuccessMessage("Results submitted successfully!"); // Success message
      navigate(`/result/${score}/${quiz.questions.length}`);
    } catch (error) {
      console.error("Error saving result:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        setErrorMessage("An error occurred while submitting your results.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!quiz) return <CircularProgress />;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2, paddingBottom: "80px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        {quiz.title}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        {quiz.questions.map((question) => (
          <FormControl
            component="fieldset"
            key={question._id}
            sx={{ marginBottom: 3 }}
          >
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              {question.questionText}
            </Typography>
            <RadioGroup
              value={answers[question._id] || ""}
              onChange={(e) => handleChange(question._id, e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>

      {/* Snackbar for error messages */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />

      {/* Snackbar for success messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />
    </Container>
  );
};

export default Quiz;
