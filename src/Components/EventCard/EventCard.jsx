import React from "react";
import './EventCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import {collection, getDocs} from 'firebase/firestore'
import { db } from "../../firebase";

import { useNavigate } from "react-router-dom";

import {connect} from 'react-redux';


const EventCard = (props) => {

    let history = useNavigate();

    const fetchStudentList = () => {
        props.setLoading(true);

        const c= collection(db,'events/'+props.id+'/registeredUsers');
        getDocs(c)
        .then(snap=>{
            const users= snap.docs.map((doc) => ({...doc.data(), id: doc.id,eventID:props.id}));
            props.setUsers(users,props.eventName);
            history('/students')
        })
        .catch(err => {
            console.log(err.code)
            props.logout()
        })
        .finally(() => props.setLoading(false))
    }


    const pastEvent = new Date() > props.timestamp.toDate(); //checking if this is a past event
    const currEvent = new Date() === props.timestamp.toDate();
    var colour="";
    var tag="";
    if(pastEvent)
    {
        colour="Yellow";
        tag="Past";
    }
    else if(currEvent)
    {
        colour="Blue";
        tag="Current";
    }
    else
    {
        colour="Green";
        tag="Upcoming";
    }
    return (
        <Card sx={{ maxWidth: 345, minWidth: 300, margin:3, cursor:'pointer' }} onClick={fetchStudentList} >
            <CardMedia
                component="img"
                height="140"
                image={props.url}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                {props.eventName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <p>Event Date: <b>{props.timestamp.toDate().toLocaleDateString()}</b></p>
                <p className={["EventTime", colour].join(" ")}>{tag}</p>
                </Typography>
            </CardContent>
        </Card>
    )
}

const mapDistpatchToProps = dispatch => {
    return {
        setLoading: (val) => dispatch({
            type:"LOADING", 
            loading: val,
        }),
        setUsers: (val,ename) => dispatch({
            type:"SET_USERS",
            users: val,
            eventName: ename
        }),
        logout: () => dispatch({
            type:"LOGIN",
            login: false,
        })
    }
}

export default connect(null, mapDistpatchToProps)(EventCard);
