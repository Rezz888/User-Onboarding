import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from "axios";
import UserDisplay from "../UserDisplay";
import Input from "./Input";

// const formSchema = yup.object().shape({
//     name: yup.string().required("Required field"),
//     email: yup
//     .string()
//     .email("Must be a valid email address")
//     .required("Must include a valid email"),
//     password: yup.string().required("Must include a password"),
//     role: yup.string().required("Must choose a role"),
//     terms: yup.boolean().oneOf([true], "Please agree to terms of use")
// });


export default function Form() {

  const defaultState = {
    name: "",
    email: "",
    password: "",
    role: "",
    terms: false
  }
  
  const [formState, setFormState] = useState(defaultState);
  // In the errorState below 'terms' is set to a string cause' unlike default state, the error msg in the schema is a string, not a boolean.
 const [errors, setErrors] = useState({...defaultState, terms: ""});
  // console.log(formState)
  // console.log(errorState)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [user, setUser] = useState([]);


  // formstate schema

  let formSchema = yup.object().shape({

    name: yup.string().required("Please provide a name"),
    email: yup
    .string()
    .required("Please provide an email")
    .email("This is not a valid email"),
    password: yup.string().required("Password required"),
    role: yup.string(),
    terms: yup.boolean().oneOf([true], "Please agree to the terms of services")

  })

  useEffect(()=> {
    formSchema.isValid(formState)
    .then(valid => {
      setButtonDisabled(!valid)
    })
  }, [formState])

    // // BONUS!: state for whether our button should be disabled or not.
    // const [buttonDisabled, setButtonDisabled] = useState(true);
    // const [user, setUser] = useState([]);
    // // Everytime formState changes, check to see if it passes verification.
    // // If it does, then enable the submit button, otherwise disable
    // useEffect(() => {
    //   formSchema.isValid(formState).then(valid => {
    //     setButtonDisabled(!valid);
    //   });
    // }, [formState]);

   
    

    // const [errorState, setErrorState] = useState({
    //   name: "",
    //   email: "",
    //   password: "",
    //   role: ""
    // });

    

    // const validate = (e) => {
    //     yup.reach(formSchema, e.target.name )
    //     .validate(e.target.value)
    //     .then( valid =>{
    //        setErrorState({
    //            ...errorState,
    //            [e.target.name]: ""
    //        })
    //     })
    //     .catch(err => {
    //         console.log(err.errors)
    //         setErrorState({
    //             ...errorState,
    //             [e.target.name]: err.errors[0]
    //         })
    //     })
    // };

    // Validate whether value meets the schema
    const validateChange = e => {
      // reach allows us to check a specific value in schema
      e.persist();
      // Note: If you want to access the event properties in an asynchronous way, you should call event.persist() on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
      // https://reactjs.org/docs/events.html
      
      yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid =>
        setErrors({
          ...errors,
          [e.target.name]: ""

        })
        )
        .catch(error =>
              setErrors({
                ...errors,
                [e.target.name]: error.errors[0]

    }))
  }
      
    // onChange function
    const inputChange = e => {
      // console.log(e.target.type)

    // Ternary opearator to determine the form value
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
     setFormState({
      ...formState, 
      [e.target.name] : value
    })
      validateChange(e);
    }

    // So we have this validateChange function and we are invoking it in the inputChange and passing each input events
    // to check if the value will meet the schema that we defined.
    // Validation recap: reach allows us to check a specific value in schema in the validateChange function. Then
    // we check what data we validate by the validate method. Then if it's valid it providees an empty string through
    // the asyncronus .then function.
    

    //onSubmit function
    const formSubmit = e => {
        e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
      console.log("form submitted success")
      setUser([...user, response.data]);
      setFormState(defaultState)
      
      })
      .catch(err => console.log(err));
    };


  return (
    <div className="form">
      <form onSubmit={formSubmit}>

        <Input 
        type="text" 
        name="name" 
        id="name" 
        value={formState.name}
        onChange={inputChange}
        label="Name"
        errors={errors}
        />

        {/* <label htmlFor="email">
            Email
            <input 
            type="text" 
            name="email"
            id="email"
            value={formState.email}
            onChange={inputChange}
            />
            {/* {errorState.email.length > 0 ? ( <p className="error">{errorState.email}</p>) : null} */}
            {/* </label> */}

        <Input 
        type="text" 
        name="email" 
        id="email" 
        value={formState.email}
        onChange={inputChange}
        label="Email"
        errors={errors}
        />

         {/* <label htmlFor="password">
            Password
            <input 
            type="text" 
            name="password"
            id="password"
            value={formState.password}
            onChange={inputChange}
            /> */}
            {/* {errorState.password.length > 0 ? ( <p className="error">{errorState.password}</p>) : null} */}
            
        {/* </label> */}

        <Input 
        type="password" 
        name="password" 
        id="password"
        value={formState.password}
        onChange={inputChange}
        label="Password"
        errors={errors}
        />

        <label htmlFor="roles">
            What is your role?
            <select
            // value={formState.role}
            name="role"
            id="roles"
            onChange={inputChange}
            >
            <option value="Blank">Choose one option</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
            </select>

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
        <button disabled={buttonDisabled}>Sumbit</button>
      </form>
      <UserDisplay user={user} />
      </div>
  )
}