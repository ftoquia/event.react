
import React from "react";
import { observer } from "mobx-react";
import "react-datepicker/dist/react-datepicker.css";
import EventFilters from "./EventControls";
import EventListTableHeader from "./EventListTableHeader";
import EventListTableContent from "./EventListTableContent";

const EventList = observer(() => {
    return (
        <div className="event--list">
             <EventFilters/>
            <table className="table">
                <EventListTableHeader/>
                <EventListTableContent/>
            </table>
        </div>
    );
});

export default EventList;
