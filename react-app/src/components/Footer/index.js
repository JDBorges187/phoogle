import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Footer.css"

const Footer = ({ user }) => {
    return (
        <nav className="footer">
            <ul>
                <li>
                    <a href="#">
                        by: Jorge Borges
                    </a>
                </li>
                <li>
                    <a href="https://github.com/JDBorges187/">
                        Github
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/jorge-engineer/">
                        LinkedIn
                    </a>
                </li>
                {/* <li>
                    <NavLink to="/login" exact={true} activeClassName="active">
                        AngelList
                    </NavLink>
                </li> */}
            </ul>
        </nav>
    );
}

export default Footer;
