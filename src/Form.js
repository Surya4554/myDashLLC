import FormInput from './component/FormInput';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.scss';

function Form() {
  const [values, setValues] = useState({
     email : "",
     password : "",
     repassword : "",
     fullname : "",
     number : "",
  });
  const [isDisabled, setDisabled] = useState(true);

  const inputs = [
    { id : 1, name: "email", type: "email", errorMessage : "Please provide a valid email.", label: "Your Email Address", required: true },
    { id : 2, name: "password", type: "password", errorMessage : "Password should be 8-20 characters and include atleast 1 letter, 1 number and 1 specail character.", label: "Your Password", pattern:"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$", required:true },
    { id : 3, name: "repassword", type: "password", errorMessage : "Password and Confirm Password don't match!", label: "Confirm Your Password", pattern: values.password, required:true },
    { id : 4, name: "fullname", type: "text", errorMessage : "Name should not be empty.", label: "Your Full Name", pattern:"[/^[a-zA-Z ]$/]", required: true  },
    { id : 5, name: "number", type: "text", errorMessage : "Phone number should be only 10 digits.", label: "Your Phone Number", pattern:"^[0-9]{10}$", required: true }
  ];

  let navigate = useNavigate(); 
  const handleSubmit = (e) =>{
    e.preventDefault();
    let path = "/bar"; 
    navigate(path);
  };
  const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  const handleDisabled = () => {
       setDisabled(!isDisabled);
  }

  return (
    <div className="app">
       <div className='right'>
           <div className='image'>
              <img src='./images/right2.png' alt="UserPhoto" />
           </div>
           <div className='right-text'>
              <h2>Choose a date range</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit voluptate odio veniam neque reiciendis laudantium eum quae, autem earum!</p>
           </div>
       </div>
       <div className='left'>
          <form onSubmit={handleSubmit}>
               {inputs.map((input) => (
                   <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
               ))}
               <div className='radio'><label> <input className="check-box" type="checkbox" onClick={handleDisabled} /> I read and agree Term and Conditions.</label> </div>
               <div> <input className='btn' type="submit" value="Create Account" disabled={isDisabled} /> </div>
          </form>
       </div>
    </div>
  );
}

export default Form;
