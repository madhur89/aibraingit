import React from "react";
import "./FaceRecognization.css";

const FaceRecognization = ({ imageUrl, box }) => {
  return (
    <div className="center ma mt4">
      <img
        alt="someimg"
        id="inputimg"
        src={imageUrl}
        width="500px"
        height="auto"
      />
      <div className="bounding-box" style = {{top:box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  );
};

export default FaceRecognization;
