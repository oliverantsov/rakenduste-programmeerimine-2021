import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return(
        <div className="navbar">
            <Link to="/">
                <img className="logo" src="/oliver.png" alt="Navbar logo" />
            </Link>
            <Link to="/admin">
                <button className="redButton">Admini vaatesse</button>
            </Link>
            <Link to="/cart">
                <img className="cart" src="/cart.svg" alt="Navbar cart" />
            </Link>
        </div>
    );
}

export default Navbar;