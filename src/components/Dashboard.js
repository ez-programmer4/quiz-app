import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://quiz-app-backend-1-g8ew.onrender.com/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleViewQuizzes = (categoryId) => {
    // Use navigate to go to the quizzes page for the selected category
    navigate(`/quizzes/${categoryId}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "20px",
        paddingBottom: "40px",
        backgroundColor: "#f5f5f5", // Light background color
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Quiz Categories
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card
              sx={{
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 20, // Increase shadow on hover
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* Added a default description if not provided */}
                  {category.description || "No description available."}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewQuizzes(category._id)} // Use onClick instead of href
                  sx={{ marginTop: "10px" }}
                >
                  View Quizzes
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
