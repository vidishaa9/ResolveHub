import { Routes, Route } from "react-router-dom";
import Landing from './Landing';
import AdminLogin from "./AdminLogin";

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminLogin />} />
     </Routes>
    </>
  )
}

export default App
