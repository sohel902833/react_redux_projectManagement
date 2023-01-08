import React from "react";
import { BeatLoader, CircleLoader } from "react-spinners";
const CenterLoader = ({ loading }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircleLoader loading={loading} size={70} />
    </div>
  );
};

export default CenterLoader;
