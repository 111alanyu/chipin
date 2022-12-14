import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Landing from '../pages/landing.js';
import SignUp from '../pages/signup.js';
import Community from '../pages/community.js';
import EventCreation from '../pages/event-creation.js';
import SignOut from '../pages/signout.js';
import Event from '../pages/events.js'
import NavBar from './navbar.js';
import TimeLine from '../pages/timeline.js';
import MyEvents from '../pages/myevents.js';

export const Routing = (props) => {
  console.log(props.orgName)
  return (
    <div>
      <NavBar signedIn={props.loggedIn} handleSignIn={props.handleSignIn} handleSignOut={props.handleSignOut} role={props.role} registered={props.registered}/>
      <Routes>
        <Route exact path='/' element={<Landing registered={props.registered} handleSignIn={props.handleSignIn} signedIn={props.loggedIn}/>} />
        <Route path='/signup' element={props.registered ? <Navigate to='/' /> : <SignUp uid={props.uid} updateInfo={props.updateInfo} />} />
        <Route path='/timeline' element={<TimeLine uid={ props.uid }/>} />
        <Route path='/community' element={<Community uid={ props.uid } role={props.role} updateInfo={props.updateInfo}/>} />
        <Route path='/my-events' element={<MyEvents orgName={props.orgName} oid={props.oid}/>} />
        <Route path='/events' element={<Event uid={props.uid}/>} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/event-creation' element={<EventCreation oid={props.oid}/>} />
      </Routes>
    </div>
  );
};