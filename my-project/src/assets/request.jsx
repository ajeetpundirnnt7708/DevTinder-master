import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestslice";
import { useEffect } from "react";
import RequestCard from "./requestcard";
import { BASE_URL } from "../utils/constant";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const getrequest = async () => {
    try {
      const res = await axios.get(
        BASE_URL+"/user/request",
        { withCredentials: true }
      );

      dispatch(addRequest(res.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrequest();
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-10">
      {request.length === 0 ? (
        <p>No requests found</p>
      ) : (
        request.map((user) => (
          <RequestCard key={user._id} user={user} />
        ))
      )}
    </div>
  );
};

export default Request;

