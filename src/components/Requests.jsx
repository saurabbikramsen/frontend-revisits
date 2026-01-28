import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <h1 className="text-xl flex justify-center mt-10">No Requests found</h1>
    );
  }
  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center gap-10 border-black my-24">
      <div className="flex flex-col w-2/5 items-center gap-10 border-red-300">
        <h1 className="text-5xl font-bold">Requests</h1>
        <div className="flex flex-col gap-5 w-full">
          {requests.map((request) => {
            const { firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div
                key={request._id}
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
                <div className="flex gap-2 mt-5 ml-5">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      reviewRequest("REJECTED", request._id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      reviewRequest("ACCEPTED", request._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
