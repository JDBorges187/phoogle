import React from "react";
import { useDispatch } from "react-redux";
import { loginDemoUser } from "../../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();
  const onDemoButton = async (e) => {
    dispatch(loginDemoUser());
  };

  return <button className="signup-btn" style={{left: "60%"}}
  onClick={onDemoButton}>Demo</button>;
};

export default DemoButton;