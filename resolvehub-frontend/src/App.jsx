import { Routes, Route } from "react-router-dom";
import Landing from './Landing';
import AdminLogin from "./AdminLogin";
import ComplaintForm from "./ComplaintForm";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister"
import ProtectedRoute from "./ProtectedRoute";
import MyComplaint from './MyComplaint'

function App() {
  return (
    <>
     <Navbar />
     <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/mycomplaints" element={<MyComplaint />} />
      <Route path="/registercomplaint"
        element={
        <ProtectedRoute>
          <ComplaintForm />
        </ProtectedRoute>
        }
    />

     
      <Route path="/admindashboard" element={
          <Dashboard />
        } />
     </Routes>
    </>
  )
}

export default App





