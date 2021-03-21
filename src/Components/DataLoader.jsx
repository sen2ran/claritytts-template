import React, { useState } from "react";

const DataLoader = ({ heading, jsonVal, index }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <h3>
  {index + 1 } {"  -  "}{heading} :{" "}
        <label htmlFor={`checkbox_open${heading}`}>
          <input
            type="checkbox"
            id={`checkbox_open${heading}`}
            checked={isShow}
            onChange={() => setIsShow(!isShow)}
          />
          Open
        </label>
      </h3>
      {isShow && (
        <textarea
          cols="30"
          readOnly={true}
          style={{ width: "100%", outline: "none" }}
          rows="10"
          value={JSON.stringify(jsonVal, undefined, 4)}
        ></textarea>
      )}
    </div>
  );
};

export default DataLoader;
