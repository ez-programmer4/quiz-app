import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizResponse = await axios.get(
          "http://localhost:5000/api/quizzes"
        );
        setQuizzes(quizResponse.data);

        const userResponse = await axios.get("http://localhost:5000/api/users");
        setUsers(userResponse.data);

        const categoryResponse = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateQuiz = () => {
    navigate("/add-quiz");
  };

  const handleAddCategory = () => {
    navigate("/add-category"); // Navigate to AddCategory page
  };

  const handleEditQuiz = (quizId) => {
    navigate(`/edit-quiz/${quizId}`);
  };

  const handleViewQuiz = (quizId) => {
    navigate(`/view-quiz/${quizId}`);
  };

  const handleViewUser = (userId) => {
    navigate(`/user-detail/${userId}`);
  };

  const handleDeleteQuiz = async (quizId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
    } catch (error) {
      console.error(
        "Error deleting quiz:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateQuiz}>
        Create New Quiz
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddCategory}
        style={{ marginLeft: "10px" }}
      >
        Add Category
      </Button>

      {/* Users Section */}
      <Paper style={{ marginTop: "2rem", padding: "1rem" }}>
        <Typography variant="h6">Registered Users</Typography>
        <Typography variant="subtitle1">Total Users: {users.length}</Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} key={user._id}>
              <Paper
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => handleViewUser(user._id)}
              >
                <Typography variant="body1">{user.email}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Categories Section */}
      <Paper style={{ marginTop: "2rem", padding: "1rem" }}>
        <Typography variant="h6">Categories</Typography>
        <Typography variant="subtitle1">
          Total Categories: {categories.length}
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} key={category._id}>
              <Paper
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">{category.name}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Quizzes Section */}
      <Paper style={{ marginTop: "2rem", padding: "1rem" }}>
        <Typography variant="h6">Manage Quizzes</Typography>
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} key={quiz._id}>
              <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
                <Typography variant="h6">{quiz.title}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewQuiz(quiz._id)}
                >
                  View Quiz
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleEditQuiz(quiz._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit Quiz
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete Quiz
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
