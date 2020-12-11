import React, { useState,useRef } from "react";
import { observer } from "mobx-react";
import store from "../../stores/EventStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const EventPicker = observer(() => {
    const [startDate, setStartDate] = useState(new Date());
    const eventNameRef = useRef(null);

    if(store.isActionPerform && eventNameRef.current)
    {
        eventNameRef.current.value = "";
        store.buttonDisabled = true;
    }

    const handleDateSelection = (date) =>{
        setStartDate(date);
        store.enableDisableButton(eventNameRef.current.value, date);
    }

    const renderEventNameField = () =>{
        return (
            <div className="fields-wrapper">
                <label className="schedule-fields label"> Event Name: </label>
                <input className="schedule-fields input" 
                    onChange={(e) => (store.enableDisableButton(e.target.value, ))} 
                    ref={eventNameRef} placeholder={"Enter event name"}
                />          
            </div>
        )
    }

    const renderEventDateField = () =>{
        return (
            <div className="fields-wrapper">
                <label className="schedule-fields label"> Event Date: </label>
                <DatePicker 
                    className="schedule-fields input"
                    placeholderText={"Enter event date"} 
                    isClearable 
                    selected={startDate} 
                    onChange={date => handleDateSelection(date)} 
                    minDate={moment().toDate()}
                    showTimeSelect
                    disabledKeyboardNavigation
                />
            </div>
        )
    }

    const renderErrorMessage = () =>{
        return <div className="error-mesage">{store.errorMessage}</div>
    }

    const renderSubmitButton = () =>{
        return (
            <button className="button" disabled={store.buttonDisabled}
            onClick={() => store.handleAddEvent(eventNameRef.current?.value, startDate)}>
               Add Event 
            </button>
        )
    }
   
   return (
        <div className="event--picker row" style={{display: store.formDisplayed ? "flex" : "none"}}>
            {renderEventNameField()}
            {renderEventDateField()}
            {renderSubmitButton()}
            {renderErrorMessage()}
        </div>
   );
});

export default EventPicker;
