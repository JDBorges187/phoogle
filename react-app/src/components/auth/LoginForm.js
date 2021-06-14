import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoButton from "./DemoButton";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/photos" />;
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
          <h2 className="form-heading">Sign in</h2>
          <p className="form-text">to continue to Phoogle Photos</p>
        </div>
      <form className="signup-form"
      onSubmit={onLogin}>
        <div>
          {errors.map((error,i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            name="email"
            type="email"
              className="auth-input"
            placeholder="Email"
            required
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            name="password"
            type="password"
              className="auth-input"
            placeholder="Password"
            required
            value={password}
            onChange={updatePassword}
          />
          <button className="signup-btn"
          type="submit">Login</button>
      <DemoButton />
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
