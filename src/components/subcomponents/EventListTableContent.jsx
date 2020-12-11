
import React from "react";
import { observer } from "mobx-react";
import store from "../../stores/EventStore";
import "react-datepicker/dist/react-datepicker.css";
import {toJS} from 'mobx';
import moment from 'moment';

const EventListTableContent = observer(() => {
    const events = toJS(store.eventList);
    const renderEvents = () =>{
        if(store.eventList.length > 0) 
        {
            return events.map((item) =>{
                return (
                    <tr key={item.eventId}>
                        <td className="details">{item.eventName}</td>
                        <td className="details">{moment(item.eventDate).format('LLLL')}</td>
                        <td className="details">{store.computeEventNotification(item.eventDate)}</td>
                        <td><span className="delete" onClick={() => store.deleteEvent(item.eventId)}>Delete</span></td>
                    </tr>
                )
            }); 
        }
        else return <tr className="no-events-wrapper"><td className="no-events">No events</td></tr>
    }

    return (
        <tbody>
            {renderEvents()}
        </tbody>
    );
});

export default EventListTableContent;
