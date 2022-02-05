import * as React from 'react';
import { Link } from 'react';
import slice from '../../assets/images/slice.png';
import './navbar.css'

const handleLogout = () => {

}

const Navbar = () => {
    return (
        <div className="navbar">
            <Link className="navbar-home-btn" to="/">
                Home
            </Link>
            <Link onClick={handleLogout} to="/" className="navbar-logout-btn">
                Logout
            </Link>
        </div>
    );
};
export default Navbar;
