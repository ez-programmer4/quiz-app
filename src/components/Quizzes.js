import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Quizzes = () => {
  const { categoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quizzes/category/${categoryId}`
        );
        console.log("Fetched quizzes:", response.data); // Log the fetched quizzes
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [categoryId]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Quizzes for Category ID: {categoryId}
      </Typography>
      {quizzes.length === 0 ? (
        <Typography variant="h6" align="center">
          No quizzes available for this category.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quiz.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/quiz/${quiz._id}`} // Use _id instead of id
                    style={{ marginTop: "10px" }}
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Quizzes;
