// src/components/Feed.jsx
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";
import { useEffect } from "react";
import Feedcard from "./feedcard";
import { BASE_URL } from "../utils/constant";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    // if (feed.length > 0) return; // IMPORTANT

    try {
      const res = await axios.get(
        BASE_URL+"/user/feed",
        { withCredentials: true }
      );
      dispatch(addFeed(res?.data?.users || []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(feed.length===0) getFeed();
   
  }, [feed.length]);

  if (feed.length === 0) {
    return (
      <div className="text-2xl text-center mt-20 text-gray-400">
        🎉 No more users
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <Feedcard user={feed[0]} />
    </div>
  );
};

export default Feed;
