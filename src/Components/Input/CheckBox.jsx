import React from "react";

const CheckBox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="col-12">
    <div className="form-check">
      <label>
        <input
          type="checkbox"
          name={label}
          checked={isSelected}
          onChange={onCheckboxChange}
          className="form-check-input"
        />
        {label}
      </label>
    </div>
  </div>
);

export default CheckBox;
