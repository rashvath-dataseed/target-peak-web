import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="atom">
        <div className="electron"></div>
        <div className="electron"></div>
        <div className="electron"></div>
      </div>
    </div>
  );
};

export default Loader;
