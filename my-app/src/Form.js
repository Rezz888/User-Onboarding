import React, {useState} from 'react';
import * as yup from 'yup';
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Required field"),
    email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include a valid email"),
    password: yup.string().required("Must include a password"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
}) 


export default function Form() {

    const [formState, setFormState] = useState({
      name: "",
      email: "",
      password: "",
      terms: false
      
    });
    

    const [errorState, setErrorState] = useState({
      name: "",
      email: "",
      password: "",
      terms: ""
    });

    

    const validate = (e) => {
        yup.reach(formSchema, e.target.name )
        .validate(e.target.value)
        .then( valid =>{
           setErrorState({
               ...errorState,
               [e.target.name]: ""
           })
        })
        .catch(err => {
            console.log(err.errors)
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
            })
        })
    };

    
    // onChange function
    const inputChange = e => {
        e.persist()
    //   console.log("input changed!", e.target.value, e.target.checked)
      validate(e)
      let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setFormState({ ...formState, [e.target.name]: value})
    }

    //onSubmit function
    const formSubmit = e => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users",  formState)
        .then(response =>{
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        });
    };


  return (
    <div className="form">
      <form onSubmit={formSubmit}>
        <label htmlFor="name">
            Name
            <input type="text" 
            name="name" 
            id="name" 
            value={formState.name}
            onChange={inputChange}
            />
            {errorState.name.length > 0 ? ( <p className="error">{errorState.name}</p>) : null}
            
        </label>

        <label htmlFor="email">
            Email
            <input 
            type="text" 
            name="email"
            id="email"
            value={formState.email}
            onChange={inputChange}
            />
            {errorState.email.length > 0 ? ( <p className="error">{errorState.email}</p>) : null}
            </label>

         <label htmlFor="password">
            Password
            <input 
            type="text" 
            name="password"
            id="password"
            value={formState.password}
            onChange={inputChange}
            />
            {errorState.password.length > 0 ? ( <p className="error">{errorState.password}</p>) : null}
            
        </label>
        <label htmlFor="terms">
            <input 
            type="checkbox" 
            name="terms" 
            id="terms" 
            checked={formState.terms}
            onChange={inputChange}
            />
           Terms of service
           {errorState.terms.length > 0 ? (
          <p className="error">{errorState.terms}</p>
        ) : null}
        </label>
        <button>Sumbit</button>
      </form>
      </div>
  )
}