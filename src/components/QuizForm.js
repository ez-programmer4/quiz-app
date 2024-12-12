import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Box, Typography } from "@mui/material";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value.split(","); // Assuming comma-separated options
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { title, categoryId: category, questions };

    try {
      await axios.post("http://localhost:5000/api/quizzes", quizData);
      setTitle("");
      setCategory("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Quiz
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          select
          label="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          sx={{ mb: 2 }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </TextField>
        {questions.map((q, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              required
            />
            <TextField
              fullWidth
              label="Options (comma-separated)"
              value={q.options.join(",")}
              onChange={(e) =>
                handleQuestionChange(index, "options", e.target.value)
              }
              required
            />
            <TextField
              fullWidth
              label="Correct Answer"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(index, "answer", e.target.value)
              }
              required
            />
          </Box>
        ))}
        <Button
          type="button"
          onClick={addQuestion}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Add Another Question
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit Quiz
        </Button>
      </form>
    </Container>
  );
};

export default QuizForm;
