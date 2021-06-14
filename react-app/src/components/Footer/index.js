import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Footer.css"

const Footer = ({ user }) => {
    return (
        <nav className="footer">
            <ul>
                <li>
                    <NavLink to="/" exact={true} activeClassName="active">
                        Github
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/albums" exact={true} activeClassName="active">
                        LinkedIn
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" exact={true} activeClassName="active">
                        AngelList
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Footer;
