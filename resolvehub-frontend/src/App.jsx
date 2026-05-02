import { Routes, Route } from "react-router-dom";
import Landing from './Landing';
import AdminLogin from "./AdminLogin";
import ComplaintForm from "./ComplaintForm";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

function App() {
  return (
    <>
     <Navbar />
     <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/registercomplaint" element={<ComplaintForm />} />
      <Route path="/admindashboard" element={<Dashboard />} />
     </Routes>
    </>
  )
}

export default App


