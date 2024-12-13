import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from localStorage when the component mounts
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Clear user info from localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");

    // Optionally, you can show a confirmation message or feedback here

    // Redirect to the login page
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
          {userRole === "admin" && (
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
          {userRole === "user" && (
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
          {!userRole && (
            <>
              <Button color="inherit" component={Link} to="/login">
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
