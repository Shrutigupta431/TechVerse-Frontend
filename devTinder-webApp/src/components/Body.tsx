import { useEffect, type FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./NavBar";
import Foter from "./Footer";
import { BASE_URL } from "../utils/constants/url";
import axios, { type AxiosError } from "axios";
import { addUser } from "../utils/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../types/store.types";
// import type { User } from "../types/user.types";
import type { ProfileViewResponse, ApiError } from "../types/api.types";

const Body: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store: RootState) => store.user);
  const fetchUser = async (): Promise<void> => {
    try {
      if (userData) return;
      const res = await axios.get<ProfileViewResponse>(
        BASE_URL + "/profile/view",
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(addUser(res.data as any));
      }

    } catch (err) {
      const error = err as AxiosError<ApiError>;
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Fetch user error:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(800px circle at 20% 10%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(900px circle at 85% 30%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(800px circle at 50% 95%, rgba(34,197,94,0.18), transparent 55%)",
          }}
        />

        <div className="relative">
          <Navbar />
          <div className="devtinder-anim-fade-up">
            <Outlet />
          </div>
          <Foter />
        </div>
      </div>
    </div>
  );
};

export default Body;

