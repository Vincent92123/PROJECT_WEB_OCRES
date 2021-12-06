import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css";

function NavBar() {
    return (
        <div className="nav">
            <button><Link to="/dashboard">Dashboard </Link></button>
            <button><Link to="/apiManager">API Manager </Link></button>
        </div >
    )
}

export default NavBar;