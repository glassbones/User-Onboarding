import React, { useState } from 'react'
import * as yup from 'yup' 
import axios from 'axios'

export default function FormData(){

    // state
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        tOS: false
    })

    // schema
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string().email("Must be a valid Email address").required("Must include an Email address"),
        password: yup.string().required("Password is a required field"),
        tOS: yup.boolean().oneOf([true], "Please agree to the Terms of Service")
    })

    // errorState
    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        tOS: '',
    })

    // onSubmit
    const onSubmit = e => {
        e.preventDefault();
        console.log('submitted!')
        axios
        .post('https://reqres.in/api/users', formState)
        .then(res => console.log('response: ' + res))
        .then(err => console.log('error' + err))
    }
    
    console.log('https://regres.in/api/users', formState)

    // onChange
    const onChangeHandle = e => {
        // have to do this line because we want to pass the synthetic event to validation
        // https://reactjs.org/docs/events.html
        e.persist()
        //send to validation
        validate(e)
        // set value depending on input type (checkbox or other)
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        // [e.target.name] selects the name key of e.target
        setFormState({ ...formState, [e.target.name]: value })
    }
    
    // validation
    const validate = e =>{
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrorState({
                ...errorState,
                [e.target.name]: ''
            })
        })
        .catch(err => {
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
            })
        })
    }

    // returnStatement
    return (
        <form onSubmit={onSubmit} >

            <label 
                htmlFor="name">
                Name
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    // State Related Attributes
                    value={formState.name}
                    onChange={onChangeHandle}
                />
            </label>

            <label 
                htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    // State Related Attributes
                    value={formState.email}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.email.length > 2 ?
                <p>{errorState.email}</p> : null }

            </label>

            <label 
                htmlFor="password">
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    // State Related Attributes
                    value={formState.password}
                    onChange={onChangeHandle}
                />
            </label>

            <label 
                htmlFor="tOS">
                Terms of Service
                <input
                    type="checkbox"
                    name="tOS"
                    id="tOS"
                    // State Related Attributes
                    checked={formState.tOS}
                    onChange={onChangeHandle}
                />
            </label>

            <button>Submit</button>
            
        </form>
    )
}