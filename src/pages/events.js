import React from 'react'
import MyMap from '../components/map.js'
import Autocomplete from '../components/Autocomplete.js'
import MyCard from '../components/MyCard.js'
import { db, getDocInfo } from '../utils/firebase';
import { collection, query, where, getDocs, documentId, onSnapshot } from "firebase/firestore";
import EventList from '../components/EventList.js'

const suggestions = [];
const q = query(collection(db, "events"));
const querySnapshot = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    suggestions.push(doc.data().event_name);
  });
  //console.log("Events: ", suggestions);
});


const Events = () => {
  return (
    <div>
      <div>
        <h3>Find an Event</h3>
      </div>
      <div>
        <Autocomplete suggestions={suggestions} />
      </div>
      <div>
        <MyMap />
      </div>
      <div>
        <MyCard/>
      </div>
    </div>
  )
}

export default Events