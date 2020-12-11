import { makeAutoObservable } from "mobx";
import EventList from "../data/EventListMock.json";
import moment from 'moment';

class EventStore {
   eventName = "";
   eventDate = "";
   _eventList = [];
   allEvents = [];
   errorMessage = "";
   initialLoad = true;
   deletedItem = {};
   recentAddedItem={};
   recentAction = "";
   sortDirection="desc";
   formDisplayed=false;
   buttonDisabled=true;
   isActionPerform=false;
   constructor() {
      makeAutoObservable(this)
   }

   get eventList()
   {
      if(this.initialLoad && this._eventList.length === 0)
         this.fetchEvents();
      
      return this._eventList
   }

   fetchEvents = () =>{
      this._eventList = EventList;
      this.updateAllEvents();
   }

   handleAddEvent(eventName, date){
      if(Boolean(eventName) && date)
      {
         var eventDate= date.toLocaleString();
         var eventId = this._eventList.length + 1;
         
        var eventExists = this._eventList.some(item => item.eventName?.toLowerCase() === eventName.toLowerCase());



         if(!eventExists)
         {
            this.isActionPerform=false;
            var diff = moment(date).diff(moment().toDate())
            if(diff < 0)
               this.errorMessage = "Cannot select ealier than the current time!"
            else {
               this.recentAddedItem = { eventId,eventName, eventDate};
               this._eventList.push(this.recentAddedItem);
               this.errorMessage = "";
               this.recentAction = "add";
               this.isActionPerform=true;
            }
         }
         else this.errorMessage = `Event ${eventName} already exists!`
      }
      this.updateAllEvents();
   }

   searchEventsByName(eventName){
      this.initialLoad = false;
      eventName !== "" ? this._eventList = this.allEvents.filter(item => item.eventName.toLowerCase().includes(eventName.toLowerCase())) : this.resetFilters();
   }

   computeEventNotification(date){
      if(date)
      {
         var currentDate = moment().toDate();
         var eventDate = moment(date);

         var duration = moment.duration(eventDate.diff(currentDate));
         

         var months = Math.floor(duration.asMonths());
         var days = Math.floor(duration.asDays());
         var hours = Math.floor(duration.asHours());
         var minutes = Math.round(duration.asMinutes());
         return months > 0 ? `${months} month(s)`: days > 0 ? `${days} day(s)` : hours > 0 ? `${hours} hour(s)` :minutes > 0 ?  `${minutes} minute(s)` : "meeting is done";
      }
   }

   deleteEvent(id){
      if(this._eventList.length !== 0)
      {
         this._eventList.filter((item,index) => {
            if(item.eventId === id)
            {
               var eventId = item.eventId;
               var eventName =item.eventName;
               var eventDate = item.eventDate;
               this.deletedItem = {
                  eventId,
                  eventName,
                  eventDate
               }
               this._eventList.splice(index,1);
               this.isPerformedAction=true;
            }
         },null);
      }
      this.initialLoad = false;
      this.recentAction = "delete";
      this.updateAllEvents();
   }

   undoChanges()
   {
      if(this.recentAction === "delete")
      {
         if(Object.keys(this.deletedItem).length > 0)
         {
            this._eventList.push(this.deletedItem);
            this.deletedItem = {}
         }
      }
      else {
         this.deleteEvent(this.recentAddedItem.eventId)
         this.recentAddedItem = {}
      }

      this.recentAction = ""
   }

   resetFilters() {
      this._eventList = this.allEvents;
      this.initialLoad = false;
   }

   updateAllEvents() {
      this.allEvents = this._eventList;
   }

   sortResults(sortField)
   {
      var dir = this.sortDirection;
      var type =  sortField.toLowerCase().includes('name') ? "string" : "date";
      var sortList = this._eventList.sort(function(a,b){
         a = type === "date" ? new Date(a[sortField]) : a[sortField]
         b = type === "date" ? new Date(b[sortField]) : b[sortField]
         
         if(dir === "desc")
            return type === "date" ? b-a :b.localeCompare(a);
         else 
            return  type === "date" ? a-b : a.localeCompare(b);
      });
      this.sortDirection = dir === "desc" ? "asc" :"desc";
      this._eventList = sortList;
   }

   hideShowForm() {
      this.formDisplayed = !this.formDisplayed;
   }

   enableDisableButton(eventName, eventDate)
   {
      this.isActionPerform=false;
      this.eventName = eventName;
      var date = moment(eventDate);
      var isValid = date.isValid()
      this.buttonDisabled = !(this.eventName !=="" && isValid)
   }
};
 
 export default new EventStore();
