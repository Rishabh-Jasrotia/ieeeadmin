import React from 'react';
import './StudentListPage.css';

import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from "react-csv";

import {collection, getDocs} from 'firebase/firestore'
import { db } from "../../firebase";

import {connect} from 'react-redux';
import StudentCard from '../../Components/StudentCard/StudentCard';

class StudentList extends React.Component {
    state = {
        students: this.props.students,
        filteredStudents: this.props.students,
        searchValue:"",
        csvfile:{},
        headers : [
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Department", key: "department" },
            { label: "Roll No.", key: "studentID" },
            { label: "Semester", key: "semester" },
            { label: "Whatsapp Number", key: "whatsappNumber" },
            { label: "Apploval Status", key: "isRegistrationApproved" }
          ],
        d:[]
    }

    filterStudent = (e) => {
        let val = e.target.value;
        const globalRegex = new RegExp(val,'i');
        let filteredStudents  = this.state.students.filter(event => (globalRegex.test(event.name) || globalRegex.test(event.studentId)));

        this.setState({
            searchValue: val,
            filteredStudents: filteredStudents,
        })
    }
    
    downloadCSV = () => {

        const c= collection(db,'events/'+this.props.students[0].eventID+'/registeredUsers');
        getDocs(c)
        .then(snap=>{
            const a= snap.docs.map((a) => (a.data()));
            this.setState({d:a});
            this.setState({ data: this.state.d }, () => {
                this.csvLink.link.click()
           });
        })
    }

    render(){
        let students = null;

        students = this.state.filteredStudents.map((student) => {
            return <StudentCard
                key={student.id}
                data={student}
            />;
        })

        return(
            <div className='StudentsPage'>
                <h1>Students List ( <i>{this.props.eventName}</i> )</h1>
                <div className='searchDownload'>
                    <TextField id="filled-basic"  label="Search Name/RollNo" variant="filled" margin="normal" value={this.state.searchValue} onChange={this.filterStudent}/>
                    <button onClick={this.downloadCSV}>Download CSV <DownloadIcon></DownloadIcon></button>

                    <CSVLink data={this.state.d} 
                    headers={this.state.headers} 
                    filename={'registrationList_'+this.props.eventName+'.csv'}
                    className='hidden' 
                    ref={(r) => this.csvLink = r} 
                    target='_blank'/>

                </div>
                <div className='Indexes'>
                    <h3>Name</h3>
                    <h3>Email</h3> 
                    <h3>Roll No</h3>
                    <h3>Department</h3>
                    <h3>Semester</h3>
                    <h3>WhatsApp No</h3>
                    <h3>Approved</h3>
                </div>
                {students}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        students : state.data.users,
        eventName: state.data.eventName,
    }
}

export default connect(mapStateToProps)(StudentList);