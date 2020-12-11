
import React from "react";
import { observer } from "mobx-react";
import store from "../../stores/EventStore";
import "react-datepicker/dist/react-datepicker.css";

const EventListTableHeader = observer(() => {
    return (
        <thead>
            <tr>
                <th className="headers sort-field" onClick ={() => store.sortResults("eventName")}>Event Name</th>
                <th className="headers sort-field" onClick ={() => store.sortResults("eventDate")}>Event Date</th>
                <th className="headers">Months/Days/Hours Left</th>
                <th></th>
            </tr>
        </thead>
    );
});

export default EventListTableHeader;
