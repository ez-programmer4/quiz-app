import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align="center">
              &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" align="center">
              <a
                href="/about"
                style={{ color: "white", textDecoration: "none" }}
              >
                About Us
              </a>{" "}
              |{" "}
              <a
                href="/contact"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contact
              </a>
            </Typography>
          </Grid>
          <Typography variant="body1" align="center">
            Created by ezedin ebrahim - Full Stack Developer -
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
