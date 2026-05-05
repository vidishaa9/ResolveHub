import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role; // from backend claim
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};