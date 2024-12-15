import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("User ID is not defined");
        return;
      }

      try {
        const userResponse = await axios.get(
          `https://quiz-app-backend-1-g8ew.onrender.com/api/users/${userId}`
        );
        setUser(userResponse.data);

        const progressResponse = await axios.get(
          `https://quiz-app-backend-1-g8ew.onrender.com/api/progress/${userId}`
        );
        setProgressData(progressResponse.data);

        const categoriesResponse = await axios.get(
          "https://quiz-app-backend-1-g8ew.onrender.com/api/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) return <div>Error loading user data.</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User: {user.email}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Progress:
      </Typography>
      {progressData && progressData.length > 0 ? (
        progressData.map((quiz) => (
          <Card key={quiz._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              {/* Check if quizId exists before accessing title */}
              <Typography variant="h5">
                {quiz.quizId ? quiz.quizId.title : "Quiz Title Unavailable"}
              </Typography>
              <Typography variant="body1">
                Category: {quiz.categoryId?.name || "No category"}
              </Typography>
              <Typography variant="body1">Score: {quiz.score}</Typography>
              <Typography variant="body1">
                Date Completed: {new Date(quiz.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No progress found.</div>
      )}
    </Container>
  );
};

export default UserDetail;
