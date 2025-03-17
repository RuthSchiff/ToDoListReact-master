import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Nav';
import Login from './componnents/Login';
import Register from './componnents/Register';
import App from './App';
import Home from './Home';

const AppRouter = () => {
    const userId = localStorage.getItem('userId');

    return (
        <div>
            <Routes>
                
                <Route path="" element={<Home></Home>}></Route>
                <Route path="Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/App" element={userId ? <App /> : <Navigate to="/Login" />} />
            </Routes>
        </div>
    );
};

export default AppRouter;