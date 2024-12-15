import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardContent } from "@mui/material";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [quizData, setQuizData] = useState([]);
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

        // Fetch quiz data only for quizzes with valid quizId
        const quizzes = await Promise.all(
          progressResponse.data
            .filter((quiz) => quiz.quizId) // Only fetch if quizId is valid
            .map((quiz) =>
              axios.get(
                `https://quiz-app-backend-1-g8ew.onrender.com/api/quizzes/${quiz.quizId}`
              )
            )
        );

        setQuizData(quizzes.map((q) => q.data)); // Assuming the response data is the quiz object

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
        progressData.map((quiz, index) => (
          <Card key={quiz._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5">
                {quiz.quizId
                  ? quizData[index]?.title || "Quiz Title Unavailable"
                  : "Quiz ID Unavailable"}
              </Typography>
              <Typography variant="body1">
                {quiz.categoryId ? quiz.categoryId.name : "No category"}
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
