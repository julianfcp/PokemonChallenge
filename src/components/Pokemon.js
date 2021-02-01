import React from "react";

const Pokemon = ({ number, hlName, rsName, img, types }) => {
  return (
    <li key={number}>
      <img src={img} alt="" />
      <div className="info">
        <h1>
          <span className="hl">{hlName}</span>
          {rsName}
        </h1>
        {types.map((item) => {
          return (
            <span key={item} className={"type " + item}>
              {item}
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default Pokemon;
