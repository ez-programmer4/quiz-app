import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const Result = () => {
  const { score, total, quizId } = useParams(); // Get quizId from the URL parameters
  const navigate = useNavigate();

  const parsedScore = parseInt(score, 10);
  const parsedTotal = parseInt(total, 10);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Quiz Results
      </Typography>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          {isNaN(parsedScore) || isNaN(parsedTotal) ? (
            <Typography variant="h5" color="error">
              Invalid results. Please try again.
            </Typography>
          ) : (
            <>
              <Typography variant="h5">
                You scored {parsedScore} out of {parsedTotal}!
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {parsedScore === 0
                  ? "Don't be discouraged! Try again to improve your score."
                  : "Great job! Keep up the good work!"}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/quiz-detail/${quizId}`)} // Navigate to quiz detail page
            sx={{ marginTop: 2 }}
          >
            Back to Quiz Detail
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Result;
