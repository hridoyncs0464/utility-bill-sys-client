import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import useTitle from "../Components/usetTitle";
// import useTitle from "../Components/usetTitle";

const Profile = () => {
useTitle("My Profile");
  const { user } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState(
    user?.displayName || ""
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile update feature can be extended later ✅");
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="flex items-center gap-6 mb-6">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-20">
            <span className="text-3xl">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            {displayName || "No Name Set"}
          </h2>
          <p className="text-base-content/70">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="label">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        <button className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
