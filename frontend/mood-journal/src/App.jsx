import React from "react";
import { Route, Routes,BrowserRouter } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import MoodPage from "./pages/MoodPage";
import ProfilePage from "./pages/Profile";

function App() {
  
  return (
    
      <>
        
            <Routes>
              <Route path="/" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/profile" element={<ProfilePage/>} />
            </Routes>
        
      </>
  );
}

export default App;
