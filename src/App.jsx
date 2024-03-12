import "./App.css";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginForm from "./components/SignUpForm/LoginForm";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/sign-up" replace /> },
  { path: "/sign-up", element: <SignUpForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
