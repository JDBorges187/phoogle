import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoButton from '../auth/DemoButton';
import LogoutButton from '../auth/LogoutButton';
import "./Sidebar.css"

const SideBar = ({ user }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/photos" exact={true} activeClassName="active">
            Photos
          </NavLink>
        </li>
        <li>
          <NavLink to="/albums" exact={true} activeClassName="active">
            Albums
          </NavLink>
        </li>
        {!user && <>
          <li>
          <NavLink to="/login" exact={true} activeClassName="active">
              Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" exact={true} activeClassName="active">
              Sign Up
          </NavLink>
        </li>
        <li>
          <DemoButton />
        </li></>}
        {/* {user &&
          <li>
            <LogoutButton />
          </li>} */}
      </ul>
    </div>
  );
}

export default SideBar;