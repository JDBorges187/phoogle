import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./Auth.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-page">

      <div className="signup-holder">
        <div className="form-header">
          <h1 className="logo">
            <span className="blue">P</span>
            <span className="red">h</span>
            <span className="yellow">o</span>
            <span className="blue">o</span>
            <span className="green">g</span>
            <span className="red">l</span>
            <span className="yellow">e</span>
          </h1>
          <h2 className="form-heading">Create your Phoogle Account</h2>
          <p className="form-text">to continue to Phoogle Photos</p>
        </div>
        <form className="signup-form" onSubmit={onSignUp}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            {/* <label>User Name</label> */}
            <input
              type="text"
              className="auth-input"
              placeholder="First Name"
              name="username"
              required
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              name="email"
              required
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              name="password"
              required
              onChange={updatePassword}
              value={password}
            ></input>
            {/* </div>
        <div> */}
            {/* <label>Repeat Password</label> */}
            <input
              type="password"
              placeholder="Confirm"
              className="auth-input"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className="signup-btn"
            type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
