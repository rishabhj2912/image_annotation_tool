import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ImageUpload from './ImageUpload';
import UserImages from './UserImages';
import NavBar from './NavBar';
import './App.css';
function App() {
    const [token, setToken] = useState(null);

    const handleLogin = (token) => {
        setToken(token);
    };

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <Router>
            <NavBar isLoggedIn={!!token} onLogout={handleLogout} />
            <div>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/upload" element={token ? <ImageUpload token={token} /> : <Navigate replace to="/login" />} />
                    <Route path="/images" element={token ? <UserImages token={token} /> : <Navigate replace to="/login" />} />
                    <Route path="*" element={<Navigate replace to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
