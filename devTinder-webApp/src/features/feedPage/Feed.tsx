import { useEffect, useState, type FC } from "react";
import { BASE_URL } from "../../utils/constants/url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFromFeed } from "../../utils/slices/feedSlice";
import UserCard from "../../components/UserCard";
import type { RootState } from "../../types/store.types";
import { Sparkles, X, Heart } from "lucide-react";
import { User as Profile } from "lucide-react";

const Feed: FC = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store: RootState) => (store as any).feed);

  const [isAnimating, setIsAnimating] = useState("");

  const getFeed = async () => {
    try {
      if (feed) return;

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Feed error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSendRequest = async (
    status: "interested" | "ignored",
    userId: string
  ) => {
    try {
      setIsAnimating(status);

      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      setTimeout(() => {
        dispatch(removeFromFeed(userId));
        setIsAnimating("");
      }, 300);
    } catch (err) {
      console.error(err);
    }
  };

 if (!feed || feed.length === 0)
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-[#111827] via-[#172554] to-[#0f172a] text-white">
         {/* <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#111827] via-[#172554] to-[#0f172a] px-5 py-10 text-white"></div> */}
        <div className="animate-bounce rounded-full bg-slate-800 p-6 shadow-2xl">
          <Profile size={50} className="text-cyan-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          No New Developers Found
        </h1>

        <p className="mt-3 max-w-md text-center text-slate-400">
          Looks like you've explored everyone for now 🚀
          <br />
          Come back later to discover more developers.
        </p>
      </div>
    );

  const currentUser = feed[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#111827] via-[#172554] to-[#0f172a] px-5 py-10 text-white">
      
      {/* Background Glow */}
      <div className="absolute left-[-100px] top-20 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-10 right-[-100px] h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 mb-10 flex flex-col items-center text-center">
        
        <div className="mb-3 flex items-center gap-3 rounded-full border border-cyan-400/30 bg-white/5 px-6 py-3 backdrop-blur-lg">
          
          <Sparkles
            size={18}
            className="animate-spin text-cyan-400"
            style={{ animationDuration: "3s" }}
          />

          <p className="text-sm font-semibold tracking-wide text-cyan-300">
            Discover Developers
          </p>
        </div>

        <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-5xl font-extrabold text-transparent">
          Tech Verse Feed
        </h1>
      </div>

      {/* Tinder Card */}
      <div className="relative z-10 flex flex-col items-center">
        
        <div
          className={`transition-all duration-300
          ${
            isAnimating === "interested"
              ? "translate-x-40 rotate-12 opacity-0"
              : ""
          }
          ${
            isAnimating === "ignored"
              ? "-translate-x-40 -rotate-12 opacity-0"
              : ""
          }`}
        >
          <UserCard user={currentUser} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-10">
          
          {/* Ignore */}
          <button
            onClick={() =>
              handleSendRequest("ignored", currentUser._id)
            }
            className="group rounded-full bg-white/10 p-5 backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-red-500"
          >
            <X
              size={32}
              className="text-red-400 group-hover:text-white"
            />
          </button>

          {/* Interested */}
          <button
            onClick={() =>
              handleSendRequest("interested", currentUser._id)
            }
            className="group rounded-full bg-white/10 p-5 backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-cyan-500"
          >
            <Heart
              size={32}
              className="text-cyan-400 group-hover:fill-white group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;