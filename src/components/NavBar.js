import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Ensure the path is correct

const Navbar = () => {
  const { user, logout, login } = useUser(); // This should now work
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    // After a successful login API call
    const userData = { role: "user" /* other data */ };
    login(userData); // This should set user in context
  };
  const handleLogout = () => {
    logout(); // Clear user state in context
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quiz App
        </Typography>
        <Box sx={{ display: { xs: "block", sm: "flex" } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {user?.role === "admin" && (
            <>
              <Button color="inherit" component={Link} to="/add-quiz">
                Add Quiz
              </Button>
              <Button color="inherit" component={Link} to="/add-category">
                Add Category
              </Button>
              <Button color="inherit" component={Link} to="/admin-dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {user?.role === "user" && (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Quizzes
              </Button>
              <Button color="inherit" component={Link} to="/progress">
                Progress
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
