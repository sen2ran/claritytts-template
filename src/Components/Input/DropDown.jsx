import React from "react";
import Select from "react-dropdown-select";
import ErrorLabel from '../Input/ErrorLabel'

const DropDown = ({
  isMulti = false,
  defaultDropDownArray = [{}],
  isLoading = false,
  labelField = "name",
  color = "#0074D9",
  isSearchable = true,
  placeHolder = "",
  isClearable = true,
  onChangeAction,
  index = 0,
  selectedValue = [],
  errorMessage = ""
}) => {
  const handleChange = selectedValue => {
    onChangeAction(selectedValue, index);
  };
  return (
    <div className = "col-12">
      <Select
        key={index}
        multi={isMulti}
        loading={isLoading}
        labelField={labelField}
        color={color}
        values={selectedValue}
        options={defaultDropDownArray}
        searchable={isSearchable}
        placeholder={placeHolder}
        clearable={isClearable}
        onChange={values => handleChange(values)}
      />
      {errorMessage ? <ErrorLabel message={errorMessage}/> : null}
    </div>
  );
};

export default DropDown;
