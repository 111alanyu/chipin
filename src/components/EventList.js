import React, { Component } from 'react'
import MyCard from './MyCard';
import NavBar from './navbar';
import './EventList.css'

class EventList extends React.Component {

    render() {
        return (
            <div class="myTray">
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
            </div>
        )
    }
}
export default React.memo(EventList)