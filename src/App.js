import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuizDetail from "./components/QuizDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Quizzes from "./components/Quizzes";
import Result from "./components/Result";
import Progress from "./components/Progress";
import AddQuiz from "./components/AddQuiz";
import AddCategory from "./components/AddCategory";
import ProtectedRoute from "./ProtectedRoutes";
import AdminDashboard from "./components/AdminDashboard";
import EditQuiz from "./components/EditQuiz"; // Import the EditQuiz component
import ViewQuiz from "./components/ViewQuiz"; // Import the ViewQuiz component
import UserDetail from "./components/UserDetail"; // Import the UserDetail component

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check for token
  const userRole = localStorage.getItem("role"); // Get user role
  const isAdmin = userRole === "admin"; // Determine if admin

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/quiz-detail/:quizId" element={<QuizDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/quizzes/:categoryId/*"
          element={
            <ProtectedRoute
              element={<Quizzes />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/result/:score/:total/*"
          element={
            <ProtectedRoute
              element={<Result />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/progress/*"
          element={
            <ProtectedRoute
              element={<Progress />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/add-quiz"
          element={
            <ProtectedRoute
              element={<AddQuiz />}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/add-category"
          element={
            <ProtectedRoute
              element={<AddCategory />}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
            />
          }
        />

        {/* New Routes for Editing and Viewing Quizzes */}
        <Route
          path="/edit-quiz/:quizId"
          element={
            <ProtectedRoute
              element={<EditQuiz />}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin} // Ensure this route is accessible to admins
            />
          }
        />
        <Route
          path="/view-quiz/:quizId"
          element={
            <ProtectedRoute
              element={<ViewQuiz />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Route for User Detail */}
        <Route
          path="/user-detail/:userId"
          element={
            <ProtectedRoute
              element={<UserDetail />}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin} // Adjust if needed
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
