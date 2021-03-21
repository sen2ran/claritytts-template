import React, { useEffect, useState } from "react";
import "../styles/global.css";
import Errorlabel from "../../ErrorLabel";

const DropdownMultiple = ({
  headerTitle = "",
  isSingle = false,
  labelName = "title",
  selectedList = [],
  selectedlabelName = "",
  toggleItem = {},
  list = [],
  isSelectAll = false,
  inputChanged = {},
  errorMessage = "",
  isEdit = false,
  editLableName = ""
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [input, setInput] = useState("");
  // const [internalSelectedList, setInternanSelectedList] = useState([]);
  let internalSelectedList = [];

  // let tmpSelectedList = [];
  // tmpSelectedList = [...internalSelectedList];
  // tmpSelectedList = tmpSelectedList.concat(selectedList);

  // if (selectedList.length > 0) {
  //   //setInternanSelectedList([...new Set(tmpSelectedList)]);
  //   if (tmpSelectedList.join("") !== internalSelectedList.join("")) {
  //     internalSelectedList = [...new Set(tmpSelectedList)];
  //   }
  // } else {
  //   if (internalSelectedList.length > 0) {
  //     internalSelectedList = [];
  //   }
  // }

  
  let tmpSelectedList = [];
  tmpSelectedList = [...internalSelectedList];
  tmpSelectedList = tmpSelectedList.concat(selectedList);
  if (tmpSelectedList.length > 0) {
    //setInternanSelectedList([...new Set(tmpSelectedList)]);
    if(tmpSelectedList.join('') !== internalSelectedList.join('')){
      internalSelectedList = [...new Set(tmpSelectedList)];
    }
  }
  else {
    if(internalSelectedList.length > 0){
      internalSelectedList = []
    }
  }

  

  const close = timeOut => {
    setListOpen(false);
    window.removeEventListener("mousedown", close);
  };

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const handleInputChange = evt => {
    setListOpen(true);
    setInput(evt.target.value.toUpperCase());
    inputChanged(evt.target.value.toUpperCase());
  };

  const handleRemoveItem = index => {
    return () => {
      const tmpArray = internalSelectedList.filter((item, i) => i !== index);
      // setInternanSelectedList(tmpArray);
      internalSelectedList = tmpArray;
      console.log("tmpArray", tmpArray)
      toggleItem(tmpArray);
    };
  };

  const renderDropDownFn = list => {
    return (
      <ul
        className="dd-list"
        onClick={e => e.stopPropagation()}
        onMouseEnter={() => {
          window.removeEventListener("mousedown", close);
        }}
        onMouseLeave={() => {
          window.addEventListener("mousedown", close);
        }}
      >
        {list.map((item, index) => renderDropDownSelectedItem(item, index))}
      </ul>
    );
  };

  const selectedClassname = item => {
    return internalSelectedList.some(
      isEdit
        ? list => list[editLableName] === item[editLableName]
        : list => list[labelName] === item[labelName]
    );
  };

  const checkSelectAll = () => {
    if (internalSelectedList.length === list.length) {
      return true;
    }
    return false;
  };

  const clickAll = () => {
    if (isSelectAll) {
      if (internalSelectedList.length === list.length) {
        toggleItem([]);
        // setInternanSelectedList([]);
        internalSelectedList = [];
      } else {
        toggleItem([...list]);
        // setInternanSelectedList([...list]);
        internalSelectedList = [...list];
      }
    }
  };

  const dropDownClickEvent = item => {
    let totalSelectedItem = internalSelectedList;
    isSingle
      ? (totalSelectedItem = [item])
      : !selectedClassname(item)
      ? totalSelectedItem.push(item)
      : totalSelectedItem.splice(totalSelectedItem.indexOf(item), 1);
    setInput("");
    toggleItem(totalSelectedItem);
    // setInternanSelectedList(totalSelectedItem);
    internalSelectedList = totalSelectedItem;
  };

  const renderDropDownSelectedItem = (item, index) => {
    return (
      <div key={index}>
        {index === 0 && isSelectAll ? (
          <li
            className={
              checkSelectAll() ? "dd-list-item selected" : "dd-list-item"
            }
            onClick={() => {
              clickAll();
            }}
          >
            ALL
          </li>
        ) : (
          ""
        )}
        <li
          className={
            selectedClassname(item) ? "dd-list-item selected" : "dd-list-item"
          }
          onClick={() => {
            dropDownClickEvent(item);
          }}
        >
          {item[labelName]}
        </li>
      </div>
    );
  };

  const styles = {
    container: {
      padding: "2px",
      margin: "5px"
    },

    items: {
      color: "white",
      display: "inline-block",
      padding: "2px",
      border: "1px solid #0074D9",
      backgroundColor: "#0074D9",
      borderRadius: "5px",
      margin: "5px",
      cursor: "pointer"
    },

    input: {
      outline: "none",
      border: "none",
      fontSize: "12px"
    }
  };

  return (
    <div className="col-12">
      <div className="dd-wrapper">
        <div
          className="dd-header"
          onClick={() => toggleList()}
          onMouseEnter={() => {
            window.removeEventListener("mousedown", close);
          }}
          onMouseLeave={() => {
            window.addEventListener("mousedown", close);
          }}
        >
          <label>
            <ul style={styles}>
              {internalSelectedList.map((item, i) => (
                <li key={i} style={styles.items} onClick={handleRemoveItem(i)}>
                  {item[selectedlabelName]}
                  <span style={{ paddingLeft: "5px", color: "white" }}>X</span>
                </li>
              ))}

              <input
                className="form-control dd-header dd-wrapper"
                placeholder={headerTitle}
                style={styles.input}
                value={input}
                onChange={handleInputChange}
              />
            </ul>
          </label>
        </div>
        {listOpen && renderDropDownFn(list)}
      </div>
      {errorMessage ? <Errorlabel message={errorMessage} /> : null}
    </div>
  );
};

export default DropdownMultiple;
