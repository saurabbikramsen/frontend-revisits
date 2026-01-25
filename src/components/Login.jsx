import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = React.useState("saurab@gmail.com");
  const [password, setPassword] = React.useState("Saurab@123");
  const navigete = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      return navigete("/feed");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-200">
      {" "}
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login!</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Email..."
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password..."
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
