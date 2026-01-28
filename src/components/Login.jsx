import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [isLoginForm, setIsLoginForm] = React.useState(true);

  const [error, setError] = React.useState("");
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
      setError(err.response.data || "Something went wrong");
    }
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      return navigete("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-200">
      {" "}
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login!" : "Signup"}</h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter FirstName..."
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter LastName..."
                  />
                </fieldset>
              </>
            )}
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
            <p className="text-red-500">{error}</p>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "login" : "signup"}
            </button>
          </div>
          <p
            className="cursor-pointer text-center hover:text-blue-500"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm
              ? "New user? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
