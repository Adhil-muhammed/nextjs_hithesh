import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="text-center  flex flex-col justify-center items-center min-h-screen gap-3">
      <h1>Profile</h1>
      <p className="text-2xl">
        Profile page
        <span className="p-2 ml-1 rounded-md bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default UserProfile;
