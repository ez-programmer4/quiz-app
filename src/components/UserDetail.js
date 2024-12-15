import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("User ID is not defined");
        setLoading(false);
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

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error loading user data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Snackbar
        open={true}
        message={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      />
    );

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
              {/* Fetch quiz title using quizId if necessary */}
              <Typography variant="h5">
                {quiz.quizId ? quiz.title : "Quiz Title Unavailable"}
              </Typography>
              <Typography variant="body1">
                Category:{" "}
                {quiz.categoryId
                  ? categories.find((cat) => cat._id === quiz.categoryId)?.name
                  : "No category"}
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
