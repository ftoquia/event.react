import React from "react";
import { observer } from "mobx-react";
import EventPicker from './subcomponents/EventPicker';
import EventList from "./subcomponents/EventList";
import "../styles/event.scss";
import store from "../stores/EventStore";
const Home = observer(() => {
    const renderTotal = () =>{
        return (
            <div className="total">
                <label> 
                    <b>Events : </b>  
                    <span className={store.eventList.length > 0 ? "count" : "none"}>
                        {store.eventList.length}
                    </span>
                </label>
            </div>
        )
    }
   return (
        <div className="event--section">
            <div className="total-events">
                {renderTotal()}
            </div>
            <EventPicker/>
            <EventList/>
        </div>
   );
});

export default Home;
