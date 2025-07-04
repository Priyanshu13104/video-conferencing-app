import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home.jsx';
import Room from './pages/Room.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


import './App.css'

function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:roomId" element={<PrivateRoute> <Room /> </PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
