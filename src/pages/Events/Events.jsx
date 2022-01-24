import React from "react";
import './Events.css';

import TextField from '@mui/material/TextField';
import EventCard from "../../Components/EventCard/EventCard";

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {connect} from 'react-redux';

class Events extends React.Component{

    state ={
        events: this.props.events,
        filteredEvents: this.props.events,
        searchValue:"",
        sortValue:"",
    }

    filterEvent = (e) => {
        let val = e.target.value;
        const globalRegex = new RegExp(val,'i' );
        let filteredEvents  = this.state.events.filter(event => globalRegex.test(event.eventName));
        this.setState({
            searchValue: val,
            filteredEvents: filteredEvents,
        })
    }

    sortEvent = (event) => {
        const sortType = event.target.value;

        let sortedEvents = this.props.events;

        if(sortType === 1){
            sortedEvents = sortedEvents.sort((e1, e2) => { 
                const a =  e1.eventCreationTimestamp.toDate() > e2.eventCreationTimestamp.toDate();
                return a ? 1 : -1;
            });
            this.setState({filteredEvents: sortedEvents})
        }
        else if(sortType === 2){
            sortedEvents = sortedEvents.sort((e1, e2) => { 
                const a =  e1.eventCreationTimestamp.toDate() > e2.eventCreationTimestamp.toDate();
                return a ? -1 : 1;
            });
            this.setState({filteredEvents: sortedEvents})
        }
        else if(sortType === 3){
            sortedEvents = sortedEvents.sort((e1, e2) => { 
                const a =  e1.eventCreationTimestamp.toDate() > e2.eventCreationTimestamp.toDate();
                return a ? -1 : 1;
            });
            this.setState({filteredEvents: sortedEvents})
        }

        this.setState({sortValue: sortType})
    }


    render(){
        let eventList = null;
        eventList = this.state.filteredEvents.map(({eventName, about ,id,eventPosterURL, eventCreationTimestamp}) => {
                return <EventCard 
                            key={id} 
                            eventName={eventName} 
                            about={about} 
                            id={id} 
                            url={eventPosterURL}
                            timestamp={eventCreationTimestamp}
                        />
            });

        return (
            <div className="Events">
                <h1>Events</h1>
                <div className="EventSearch">
                    <TextField id="filled-basic"  label="Search Event" variant="filled" margin="normal" value={this.state.searchValue} onChange={this.filterEvent}/>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        value={this.state.sortValue}
                        onChange={this.sortEvent}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Past</MenuItem>
                        <MenuItem value={3}>Current</MenuItem>
                        <MenuItem value={2}>Upcoming</MenuItem>
                        </Select>
                        <FormHelperText>Sort By</FormHelperText>
                    </FormControl>
                </div>
                <div className="Events_events_list">
                    {eventList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.data.events,
    }
}

export default connect(mapStateToProps)(Events);