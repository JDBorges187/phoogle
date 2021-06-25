import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoButton from '../auth/DemoButton';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = ({ user }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
          <h1 className="logo-nav">
            <span className="blue">P</span>
            <span className="red">h</span>
            <span className="yellow">o</span>
            <span className="blue">o</span>
            <span className="green">g</span>
            <span className="red">l</span>
            <span className="yellow">e</span>
          </h1>
          </NavLink>
        </li>
        {(!user) ? (
        <li>
          <DemoButton />
        </li>
        ) 
        :(
          <li>
          <LogoutButton />
        </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
