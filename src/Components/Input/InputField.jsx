import React from 'react';
import ErrorLabel from '../Input/ErrorLabel'

const InputField = ({placeholder = "", changeHandler, type="text", value="", errorMessage = ""}) => {
    return (
        <div className="md-form">
            <input className="form-control form-control-lg" type={type} placeholder={placeholder} onChange={(e)=>{changeHandler(e.target.value)}} value={value}/>
            {errorMessage ? <ErrorLabel message={errorMessage}/> : null}
        </div>
    );
}

export default InputField;