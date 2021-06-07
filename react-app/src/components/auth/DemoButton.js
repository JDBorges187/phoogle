import React from "react";
import { useDispatch } from "react-redux";
import { loginDemoUser } from "../../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();
  const onDemoButton = async (e) => {
    dispatch(loginDemoUser());
  };

  return <button onClick={onDemoButton}>Demo</button>;
};

export default DemoButton;