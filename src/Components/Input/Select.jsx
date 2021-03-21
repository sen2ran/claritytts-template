import React from "react";

const Select = ({
  name,
  value,
  handleChange,
  selectList,
  DefaultValue = "Selet Type"
}) => {
  return (
    <select
      className="form-control"
      name={name}
      value={value}
      onChange={handleChange}
    >
      <option value="-">{DefaultValue}</option>
      {selectList.map(list => (
        <option key={list} value={list}>
          {list}
        </option>
      ))}
    </select>
  );
};

export default Select;
