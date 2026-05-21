import axios, { type AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants/url";
import { removeUser } from "../utils/slices/userSlice";
import type { RootState } from "../types/store.types";
import type { User } from "../types/user.types";
import type { LogoutApiResponse, ApiError } from "../types/api.types";
import { type FC } from "react";
import { Handshake,GitPullRequest ,LogOut} from "lucide-react";
import { User as Profile } from "lucide-react";
import logo from "../assets/logo.png";

export const Navbar: FC = () => {
  const user = useSelector((store: RootState) => store.user) as User | null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.post<LogoutApiResponse>(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50  px-6 shadow-lg bg-[#0f172a] text-white border-t border-slate-800">
      
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-white"
        >
          <div className="w-15 rounded-full ring-1 ring-white ring-offset-2 ring-offset-blue-500">
                <img
                className="w-15 rounded-full ring-1 ring-white ring-offset-2 ring-offset-blue-500"
                  alt="user"
                  src={
                    logo
                  }
                />
              </div>
          {/* <Heart className="fill-white text-white" size={24} /> */}
         Tech Verse
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          
          {/* Welcome text */}
          <div className="hidden md:block">
            <p className="text-sm text-pink-100">Welcome back 👋</p>
            <p className="font-semibold text-white">
              {user.firstName}
            </p>
          </div>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer transition duration-300 hover:scale-105"
            >
              <div className="w-12 rounded-full ring-2 ring-white ring-offset-2 ring-offset-pink-500">
                <img
                  alt="user"
                  src={
                    user?.photoUrl ||
                    "https://i.pravatar.cc/150?img=3"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-4 w-60 rounded-2xl border border-pink-100 bg-white p-3 shadow-2xl"
            >
              <li className="mb-2 border-b pb-2">
                <p className="font-bold text-[#0f172a]">
                  Hey, {user.firstName} 
                </p>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="rounded-xl text-[#0f172a] hover:bg-[#0f172a]-100 hover:text-[#0f172a]"
                >
                  <Profile color="black" /> Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                 className="rounded-xl text-[#0f172a] hover:bg-[#0f172a]-100 hover:text-[#0f172a]"
                >
                  <Handshake  size={24} /> Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="rounded-xl text-[#0f172a] hover:bg-[#0f172a]-100 hover:text-[#0f172a]"
                >
                  <GitPullRequest size={24}/> Requests
                </Link>
              </li>

              <li className="mt-2 border-t pt-2">
                <a
                  onClick={handleLogout}
                 className="rounded-xl text-[#0f172a] hover:bg-[#0f172a]-100 hover:text-[#0f172a]"
                >
                 <LogOut /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};