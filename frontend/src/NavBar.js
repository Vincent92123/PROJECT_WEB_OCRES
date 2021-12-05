import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <ul className="nav">
            <li><Link to="/dashboard">Dashboard   </Link></li>
            <li><Link to="/apiManager">API Manager</Link></li>
        </ul>
    )
}

export default NavBar;