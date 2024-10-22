import React from "react";
import UpdateUserProfile from "./UpdateUserProfile";
import { useSelector } from "react-redux";
import UpdateProfilePhoto from "./UpdateProfilePhoto";

const UserProfile = () => {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    return <div>Loading...</div>; // Display a loading state while user data is being fetched
  }

  return (
    <div className="w-8/12 mx-auto bg-slate-100 mt-6 mb-6 rounded-md relative">
      <div className="flex flex-col gap-2 w-11/12 mx-auto pt-14 pb-4">
        <UpdateProfilePhoto />
        <p className="text-2xl font-semibold text-center">
          {user.firstName} {user.lastName}
        </p>
        <div className="flex justify-center gap-16 text-slate-400">
          <p>Email: {user.email}</p>
          <p>Phone: {user.phoneNumber}</p>
        </div>
      </div>
      <hr />

      <div className="flex flex-col gap-2 w-8/12 mx-auto pt-4 pb-16">
        <p className="text-xl font-semibold">Address:</p>
        <input
          type="text"
          placeholder="Enter your address..."
          disabled
          value={user.address || ""}
          className="p-2 rounded-md outline-none border border-slate-300 text-slate-400"
        />
        <div className="flex justify-between">
          <input
            className="p-2 rounded-md outline-none border border-slate-300 text-slate-400"
            type="text"
            disabled
            placeholder="Pincode / Zipcode"
            value={user.pincode || ""}
          />
          <input
            className="p-2 rounded-md outline-none border border-slate-300 text-slate-400"
            type="text"
            value={user.state || ""}
            disabled
            placeholder="State"
          />
        </div>
      </div>
      <hr />

      <div>
        <UpdateUserProfile />
      </div>
    </div>
  );
};

export default UserProfile;
