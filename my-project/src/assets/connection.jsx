import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "../utils/connectionslise";
import Connectioncard from "./connectioncard";
import { BASE_URL } from "../utils/constant";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);
  console.log("Connection is",connections)

  const FetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL+"/user/connections",
        { withCredentials: true }
      );

      dispatch(addconnections(res.data?.data));
      console.log("is running",res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="justify-items-center my-7">
        <h1 className="font-bold text-2xl">No connection Request</h1>
      </div>
    );

  return (
    <div className="justify-items-center my-7 mt-3 mb-20">
      <h1 className="font-bold text-2xl py-2 font-mono">Connections</h1>

      {connections.map((user) => (
        <Connectioncard key={user?._id} user={user} />
      ))}
    </div>
  );
};

export default Connections;
