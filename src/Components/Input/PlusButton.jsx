import React from 'react';

const PlusButton = ({onClickHandler, index}) => {
    return ( <button type="button" className="btn btn-primary" onClick={()=>{onClickHandler(index)}}>+</button>);
}
 
export default PlusButton;