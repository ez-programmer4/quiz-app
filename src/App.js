// src/App.js
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import RoutesComponent from "./RoutesComponent";
import { UserProvider } from "./UserContext";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check for token
  const userRole = localStorage.getItem("role"); // Get user role
  const isAdmin = userRole === "admin"; // Determine if admin

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <RoutesComponent isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
