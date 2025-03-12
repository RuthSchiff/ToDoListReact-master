// import React from 'react';
import { NavLink } from 'react-router-dom';


export const Nav = () => {
    return (
        <>
        <div>
            <NavLink to="Login">Login</NavLink>
            <NavLink to="Register">Register</NavLink>
            <NavLink to = "App">App</NavLink>
        </div>
        </>
    );
};

