import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Paper,
  Box,
} from "@mui/material";

const AddQuiz = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      isTrueFalse: false,
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        isTrueFalse: false,
      },
    ]);
  };

  const handleQuestionTypeChange = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isTrueFalse = !updatedQuestions[index].isTrueFalse;
    if (updatedQuestions[index].isTrueFalse) {
      updatedQuestions[index].options = ["True", "False"];
      updatedQuestions[index].correctAnswer = "True"; // Default correct answer
    } else {
      updatedQuestions[index].options = ["", "", "", ""]; // Reset options for multiple choice
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    const quizData = {
      title,
      categoryId,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
    };

    try {
      await axios.post("http://localhost:5000/api/quizzes", quizData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(
        "Error creating quiz:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "#3f51b5" }}
        >
          Add Quiz
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                displayEmpty
                required
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {questions.map((q, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label="Question"
                  variant="outlined"
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
                  }
                  required
                  sx={{ marginBottom: 2 }}
                />
                <Select
                  fullWidth
                  value={q.isTrueFalse ? "True/False" : "Multiple Choice"}
                  onChange={() => handleQuestionTypeChange(index)}
                  displayEmpty
                  sx={{ marginBottom: 2 }}
                >
                  <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                  <MenuItem value="True/False">True/False</MenuItem>
                </Select>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  Options
                </Typography>
                {q.options.map((option, optIndex) => (
                  <TextField
                    key={optIndex}
                    fullWidth
                    label={`Option ${optIndex + 1}`}
                    variant="outlined"
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(index, "options", [
                        ...q.options.slice(0, optIndex),
                        e.target.value,
                        ...q.options.slice(optIndex + 1),
                      ])
                    }
                    required={!q.isTrueFalse}
                    sx={{ marginBottom: 2 }} // Margin for options
                  />
                ))}
                <Select
                  fullWidth
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                  displayEmpty
                  required
                  sx={{ marginBottom: 2 }}
                >
                  <MenuItem value="">
                    <em>Select Correct Answer</em>
                  </MenuItem>
                  {q.options.map((option, optIndex) => (
                    <MenuItem key={optIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addQuestion}
                  sx={{
                    marginRight: 1,
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    borderRadius: 1,
                  }}
                >
                  Add Another Question
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={loading}
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    borderRadius: 1,
                  }}
                >
                  {loading ? "Submitting..." : "Submit Quiz"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddQuiz;
