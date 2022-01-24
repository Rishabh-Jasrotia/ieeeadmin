import React from "react";
import './Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {collection, getDocs} from 'firebase/firestore'
import { db, auth } from "../../firebase";

import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState('');
    const [err, setErr] = useState(null);

    const history = useNavigate();

    const fetchEvents = () => {
        const ref = collection(db, 'events');
        return getDocs(ref)
        .then(data => {
            const events = data.docs.map((doc) => ({...doc.data(), id: doc.id})); //getting data from response
            // this.setState({events:events, filteredEvents:events})
            props.setEvents(events)
            return Promise.resolve("Im fine");
        })
    }


    const login = () => {
        props.setLoading(true);
        signInWithEmailAndPassword(
            auth,
            email,
            pass,
        ).then(res => {
            setErr(null);   
            return fetchEvents()
        })
        .then(res => {
            props.setLogin(true);
            history('/events')
        })
        .catch(err => {
            setErr(err.code.split('/')[1])
        })
        .finally(() => props.setLoading(false))
    }

    return (
       <div className="Login">
           <div className="Login_Form">
                <h2>Login</h2>
                <TextField id="outlined-basic" label="Email" variant="outlined" margin="normal" type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" margin="normal" type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                {err ? <p style={{color:'red', fontStyle:'italic', margin:5}}>{err}</p> : null }
                <Button variant="contained" margin="normal" onClick={login}>Submit</Button>
           </div>
       </div> 
    )
}

const mapDistpatchToProps = dispatch => {
    return {
        setLoading: (val) => dispatch({
            type:"LOADING", 
            loading: val,
        }),
        setEvents: (val) => dispatch({
            type:"SET_EVENTS",
            events: val,
        }),
        setLogin: (val) => dispatch({
            type:"LOGIN",
            login: val,
        })
    }
}
export default connect(null, mapDistpatchToProps)(Login);