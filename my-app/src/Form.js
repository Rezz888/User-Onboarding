import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from "axios";
import UserDisplay from "./UserDisplay";

const formSchema = yup.object().shape({
    name: yup.string().required("Required field"),
    email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include a valid email"),
    password: yup.string().required("Must include a password"),
    role: yup.string().required("Must choose a role"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});


export default function Form() {

    const [formState, setFormState] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
      terms: false
      
    });

    // BONUS!: state for whether our button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user, setUser] = useState([]);
    // Everytime formState changes, check to see if it passes verification.
    // If it does, then enable the submit button, otherwise disable
    useEffect(() => {
      formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
      });
    }, [formState]);

    // useEffect(() => {

    // }, [user]);
    

    const [errorState, setErrorState] = useState({
      name: "",
      email: "",
      password: "",
      role: ""
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
        .then(response => {
            setUser([...user, response.data]);
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: false
              });
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

        <label htmlFor="roles">
            What is your role?
            <select
            value={formState.role}
            name="role"
            id="roles"
            onChange={inputChange}
            >
            <option value="Blank">Choose one option</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
            </select>
            {errorState.role.length > 0 ? (
            <p className="error">{errorState.role}</p>
            ) : null}
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
        
        </label>
        <button>Sumbit</button>
      </form>
      <UserDisplay user={user} />
      </div>
  )
}