// src/RoutesComponent.js
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuizDetail from "./components/QuizDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Quizzes from "./components/Quizzes";
import Result from "./components/Result";
import Progress from "./components/Progress";
import AddQuiz from "./components/AddQuiz";
import AddCategory from "./components/AddCategory";
import ProtectedRoute from "./ProtectedRoutes";
import AdminDashboard from "./components/AdminDashboard";
import EditQuiz from "./components/EditQuiz";
import ViewQuiz from "./components/ViewQuiz";
import UserDetail from "./components/UserDetail";
import NotFound from "./components/NotFound";

const RoutesComponent = ({ isAuthenticated, isAdmin }) => {
  return (
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
            isAdmin={isAdmin}
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
            isAdmin={isAdmin}
          />
        }
      />

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
