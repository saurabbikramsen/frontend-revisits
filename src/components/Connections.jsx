import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <h1>No connections found</h1>;
  }
  return (
    <div className="flex flex-col items-center gap-10 border-black my-24">
      <div className="flex flex-col w-1/3 items-center gap-10 border-red-300">
        <h1 className="text-5xl font-bold">Connections</h1>
        <div className="flex flex-col gap-5 w-full">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div
                key={connection._id}
                className="flex gap-2 p-4 border border-gray-400 bg-gray-200 rounded-md w-full"
              >
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl">
                    {firstName}
                    {lastName}
                  </span>
                  <span>
                    {age} {gender}
                  </span>
                  <span>{about}</span>
                </div>
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-primary">Message</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
