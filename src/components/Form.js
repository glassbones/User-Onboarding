import React, { useState } from 'react'
import * as yup from 'yup' 
import axios from 'axios'

export default function FormData(){

    //users
    const [usersState, setUsersState] = useState([])


    // state
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        select: '',
        tOS: false,
        tOS2: false,
        tOS3: false
    })

    // schema
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string().email("Must be a valid Email address").required("Must include an Email address"),   //thought it was .test but no luck :c
        password: yup.string().required("Password is a required field"),
        select: yup.string().required("Pick a flavor please"),
        tOS: yup.boolean().oneOf([true], "Please agree to the Terms of Service"),
        tOS2: yup.boolean(),
        tOS3: yup.boolean()
    })

    // errorState
    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        select: '',
        tOS: '',
        tOS2: '',
        tOS3: ''
    })


    // onSubmit
    const onSubmit = e => {
        e.preventDefault()
        if (Object.values(errorState).every(key => !key)) return
        console.log('submitted!')
        axios
        .post('https://reqres.in/api/users', formState)
        .then(res => setUsersState([...usersState, res]))
        .catch(err => console.log('error' + err))

    }

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
        console.log(formState)
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
        <div>
   
            <form onSubmit={onSubmit}
                style={{
                display:'flex',
                flexDirection:'column',
                width:'200px', 
                justifyContent:'center', 
                alignItems:'center',
                fontSize: '12px' }}>

                <label
                    htmlFor="name"
                    textcontent={'Name'} // Accessibilty BOOM!
                    hidden/> 
                <input
                    style={{margin:"2px"}}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    // State Related Attributes
                    value={formState.name}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.name.length ?
                <p style={{color: `red`, margin:"2px"}} >{errorState.name}</p> : null }

                <label 
                    htmlFor="email"
                    textcontent={'Email'} // Accessibilty BOOM!
                    hidden/>
                <input
                    style={{margin:"2px"}}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    // State Related Attributes
                    value={formState.email}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.email ?
                <p style={{color: `red`, margin:"2px"}} >{errorState.email}</p> : null }

                <label 
                    htmlFor="password"
                    textcontent={'Password'} // Accessibilty BOOM!
                    hidden/>
                <input
                    style={{margin:"2px"}}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    // State Related Attributes
                    value={formState.password}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.password ?
                <p style={{color: `red`, margin:"2px"}} >{errorState.password}</p> : null }

                <label 
                    htmlFor="select"
                    textcontent={'Chocolate or Vanilla?'} // Accessibilty BOOM!
                    hidden/>
                <select 
                    style={{margin:"2px", width: '162px'}}
                    value={formState.select}
                    name="select" 
                    id="select" 
                    onClick={ e => e.target.firstElementChild.setAttribute('disabled','') } //what is a better way to do this?
                    onChange={onChangeHandle}>
                    <option value={1}> Chocolate or Vanilla</option>
                    <option value="chocolate">Chocolate</option>
                    <option value="vanilla">Vanilla</option>
                </select>

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

                <label 
                    htmlFor="tOS2">
                    Check if you like to party
                    <input
                        type="checkbox"
                        name="tOS2"
                        id="tOS2"
                        // State Related Attributes
                        checked={formState.tOS2}
                        onChange={onChangeHandle}
                    />
                </label>

                <label 
                    htmlFor="tOS3">
                    Check if you kinda like to party
                    <input
                        
                        type="checkbox"
                        name="tOS3"
                        id="tOS3"
                        // State Related Attributes
                        checked={formState.tOS3}
                        onChange={onChangeHandle}
                    />
                </label>

                <button style={{margin:"12px"}} >Submit</button>
            
            </form>

            { //if users
            usersState.length > 0 ? 
            <pre
            style={{overflow: 'scroll',width: '200px', height: '40px', border: 'solid lightgrey'}}>{JSON.stringify(usersState)}</pre>
             : null}

        </div>
        
    )
}