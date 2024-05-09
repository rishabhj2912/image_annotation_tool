import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();  // Clear the token or user state
        navigate('/login');
        alert('You are now logged out.');
    };

    return (
        <nav>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'lightblue' }}>
                {isLoggedIn ? (
                    <>
                        <Link to="/upload" style={{ margin: '0 10px' }}>Upload</Link>
                        <Link to="/images" style={{ margin: '0 10px' }}>View Images</Link>
                        <button onClick={handleLogout} style={{ margin: '0 10px' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
                        <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
