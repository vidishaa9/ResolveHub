import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role; 
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};