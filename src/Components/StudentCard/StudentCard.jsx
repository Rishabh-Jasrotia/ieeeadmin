import React from 'react';
import './StudentCard.css';

import {updateDoc, doc} from 'firebase/firestore'
import { db } from "../../firebase";

import Switch from '@mui/material/Switch';


const StudentCard = (props) => {

    const data = props.data;
    const [selected, setSelected] = React.useState(data.isRegistrationApproved);
    updateDoc(doc(db,'events',data.eventID,'registeredUsers',data.id),{isRegistrationApproved:selected});
    updateDoc(doc(db,'users',data.id,'registeredEvents',data.eventID),{isRegistrationApproved:selected});

    return (
        <div className='StudentCard'>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.studentID}</p>
            <p>{data.department}</p>
            <p>{data.semester}</p>
            <p>{data.whatsappNumber}</p>
            <div style={{flex:1, display:"flex", justifyContent:'center'}}>
                <Switch
                    checked={selected}
                    onChange={() => setSelected(!selected)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    )
}

export default StudentCard;