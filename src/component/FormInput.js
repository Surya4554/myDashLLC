import React, { useState } from 'react';
import '../index.scss';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, onChange, errorMessage, id, ...inputProps } = props;

  const handleFocus =(e) =>{
      setFocused(true);
  };
  return (
    <div className='form-input'>
        <label>{label}</label>
        <br/>
        <input {...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={() => inputProps.name==="repassword" && setFocused(true)} focused={focused.toString()} />
        <br/><span>{errorMessage}</span>
    </div>
  )
}

export default FormInput;
