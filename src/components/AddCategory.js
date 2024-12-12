import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/categories", {
        name: categoryName,
        description: description, // Include description in the request
      });
      setCategoryName("");
      setDescription(""); // Clear description after submission
      navigate("/admin-dashboard"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Add New Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Description" // New input for description
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required // Keep this required if necessary
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth // Make the button full width for better responsiveness
          >
            Add Category
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCategory;
