import { Navigate } from "react-router";
import { isLoggedIn } from "./auth";

export default function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/userlogin" />;
}