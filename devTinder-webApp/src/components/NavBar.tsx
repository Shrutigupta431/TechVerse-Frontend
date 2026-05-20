import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants/url";
import { removeUser } from "../utils/slices/userSlice";

export const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout =async()=>{
    try{
     const res = await axios.post(BASE_URL+ "/logout",
      {},{withCredentials:true});
      dispatch(removeUser())
     navigate("/login")
    }catch(err){
        console.error(err)
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm" data-theme="dark">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      {user && (
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-20 md:w-auto"
          />
          <p className="mt-2">Wecome {user.firstName}</p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-1"
            >
              <div className="w-10 rounded-full mr-1">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
