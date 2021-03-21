import React from 'react';

const PlusButton = ({onClickHandler, index}) => {
    return ( <button type="button" className="btn btn-danger" onClick={()=>{onClickHandler(index)}}>-</button>);
}
 
export default PlusButton;