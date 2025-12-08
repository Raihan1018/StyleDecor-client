import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <BounceLoader color="#7c3aed" />
    </div>
  );
};

export default Loading;
