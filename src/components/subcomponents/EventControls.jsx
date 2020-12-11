
import React, {useRef} from "react";
import { observer } from "mobx-react";
import store from "../../stores/EventStore";
import "react-datepicker/dist/react-datepicker.css";
const EventFilters = observer(() => {
    const searchRef = useRef(null);
    if(store.formDisplayed && searchRef.current)
    {
        searchRef.current.value = ""
        store.resetFilters();
    }
    const renderUndoButton = () =>{
        return (
            <div className="undo">
                <button className="button" onClick={() => store.hideShowForm()}>
                    {store.formDisplayed ? "Hide form event" : "Add event"}
                </button>
                <button className="button" disabled={!Boolean(store.recentAction)} onClick={() => store.undoChanges()}> 
                    {`Undo ${store.recentAction} changes`}
                </button>
            </div>
        )
    }

    const renderSearchField = () => {
        return (
            <>
                <label>Search event </label>
                <input ref={searchRef}className="schedule-fields label" placeholder={"Enter event name"} onChange={(e) => store.searchEventsByName(e.target.value)}/>
            </>
        )
    }
   
    return (
        <div className="event--filters">
            {renderSearchField()}
            {renderUndoButton()}
        </div>
    );
});

export default EventFilters;
