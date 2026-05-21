import { type FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios, { type AxiosError } from "axios";
import type { RootState } from "../../types/store.types";
import type { User } from "../../types/user.types";
import type { ApiError } from "../../types/api.types";
import type { ProfileUpdateData } from "../../types/profile.types";
import { BASE_URL } from "../../utils/constants/url";
import { addUser } from "../../utils/slices/userSlice";
import UserCard from "../../components/UserCard";

const EditProfile: FC = () => {
  const user = useSelector((store: RootState) => store.user) as User | null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log("user",user)

  const normalizeGender = (gender?: string) => {
    if (!gender) return "";
    const normalized = gender.toLowerCase();
    return normalized === "male" ||
      normalized === "female" ||
      normalized === "other"
      ? normalized
      : gender;
  };

  const [formData, setFormData] = useState<ProfileUpdateData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age,
    gender: normalizeGender(user?.gender),
    about: user?.about || "",
    skills: user?.skills || [],
    photoUrl: user?.photoUrl || "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

useEffect(() => {
  if (user) {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      age: user.age,
      gender: normalizeGender(user.gender),
      about: user.about || "",
      skills: user.skills || [],
      photoUrl: user.photoUrl || "",
    });
  }
}, [user]);
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold">Please login first</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== index),
    }));
  };

  const previewUser: User = {
    ...user,
    ...formData,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await axios.put(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });

      if (res.data) {
        dispatch(addUser(res?.data?.data));
        setSuccess(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const message =
        error.response?.data?.message || "Failed to update profile";
      setError(message);
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#111827] via-[#172554] to-[#0f172a] px-4 py-8 text-white">
      {/* Glow Effects */}
      <div className="absolute left-[-120px] top-20 h-80 w-80 animate-pulse rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-[-120px] h-80 w-80 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-6">
          <p
            className="
            mb-3 inline-flex rounded-full
            border border-cyan-400/20
            bg-cyan-500/10 px-4 py-1
            text-xs font-medium tracking-wide text-cyan-300
          "
          >
            Developer Profile
          </p>

          <h1
            className="
            bg-gradient-to-r from-cyan-300
            via-blue-400 to-purple-400
            bg-clip-text text-4xl
            font-extrabold text-transparent
          "
          >
            Edit Your Profile
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Keep your developer profile updated 🚀
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* LEFT PREVIEW */}
          <div
            className="
            rounded-[28px] border border-white/10
            bg-white/5 p-4 shadow-2xl
            backdrop-blur-xl
            h-fit
          "
          >
            <UserCard user={previewUser} />
          </div>

          {/* RIGHT FORM */}
          <div
            className="
            rounded-[28px] border border-white/10
            bg-white/5 p-6 shadow-2xl
            backdrop-blur-xl
          "
          >
            {/* Alerts */}
            {error && (
              <div
                className="
                mb-5 rounded-2xl border
                border-red-400/20 bg-red-500/10
                p-4 text-sm text-red-300
              "
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="
                mb-5 rounded-2xl border
                border-green-400/20 bg-green-500/10
                p-4 text-sm text-green-300
              "
              >
                Profile updated successfully 🚀
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="
                    w-full rounded-2xl border
                    border-white/10 bg-white/5
                    px-4 py-3 text-white
                    outline-none transition duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-white/10
                  "
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="
                    w-full rounded-2xl border
                    border-white/10 bg-white/5
                    px-4 py-3 text-white
                    outline-none transition duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-white/10
                  "
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Photo URL
                  </label>

                  <input
                    type="url"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="
                    w-full rounded-2xl border
                    border-white/10 bg-white/5
                    px-4 py-3 text-white
                    outline-none transition duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-white/10
                  "
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                    placeholder="22"
                    min="18"
                    max="100"
                    className="
                    w-full rounded-2xl border
                    border-white/10 bg-white/5
                    px-4 py-3 text-white
                    outline-none transition duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-white/10
                  "
                  />
                </div>

                {/* Gender */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="
      w-full rounded-2xl border
      border-white/10 bg-white/5
      px-4 py-3 text-white
      outline-none transition duration-300
      focus:border-cyan-400/40
      focus:bg-[#172554]
      hover:border-cyan-400/20
    "
                  >
                    <option value="" className="bg-[#111827] text-slate-400">
                      Select Gender
                    </option>

                    <option value="male" className="bg-[#111827] text-white">
                      Male
                    </option>

                    <option value="female" className="bg-[#111827] text-white">
                      Female
                    </option>

                    <option value="other" className="bg-[#111827] text-white">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* About */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  About
                </label>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="Tell the developer community about yourself..."
                  className="
                  h-32 w-full rounded-2xl border
                  border-white/10 bg-white/5
                  px-4 py-3 text-white
                  outline-none transition duration-300
                  placeholder:text-slate-500
                  focus:border-cyan-400/40
                  focus:bg-white/10
                "
                />
              </div>

              {/* Skills */}
              <div>
                <label className="mb-3 block text-sm text-slate-300">
                  Skills
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="React, Node.js..."
                    className="
                    flex-1 rounded-2xl border
                    border-white/10 bg-white/5
                    px-4 py-3 text-white
                    outline-none transition duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-white/10
                  "
                  />

                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="
                    rounded-2xl bg-cyan-500
                    px-5 py-3 font-semibold text-white
                    transition duration-300
                    hover:scale-105 hover:bg-cyan-400
                  "
                  >
                    Add
                  </button>
                </div>

                {/* Skill Chips */}
                {formData.skills && formData.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="
                            flex items-center gap-2
                            rounded-full border
                            border-cyan-400/20
                            bg-cyan-500/10
                            px-4 py-2 text-sm
                            text-cyan-300
                          "
                      >
                        {skill}

                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 pt-2 md:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                  flex-1 rounded-2xl
                  bg-gradient-to-r from-cyan-500
                  to-blue-500 px-5 py-3
                  font-semibold text-white
                  transition duration-300
                  hover:scale-[1.02]
                  hover:from-cyan-400
                  hover:to-blue-400
                "
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => navigate("/profile")}
                  className="
                  flex-1 rounded-2xl border
                  border-white/10 bg-white/5
                  px-5 py-3 font-medium text-slate-300
                  transition duration-300
                  hover:border-cyan-400/30
                  hover:bg-cyan-500/10
                  hover:text-cyan-300
                "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
