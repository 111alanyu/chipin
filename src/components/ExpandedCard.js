import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MyCard.css'
import { display } from '@mui/system';

export default function ExpandedCard(props, {
    showCard
}) {
    const { event, register, hasEventStarted, registered } = props;
    let userHasRegistered = false
    for(let i = 0; i < registered.length; i++){
        if (props.uid === registered[i]){
            userHasRegistered = true
            break;
        }
    }
    let displayRegister = hasEventStarted ? (userHasRegistered ? "Registered!" : "Cannot Register") : (userHasRegistered ? "Registered" : <Button className="reg-button" style={{ margin: "auto", marginBottom: 5 }} size="small" onClick={(e) => alertPopup(e)}>Register</Button>)
    console.log(displayRegister)
    const alertPopup = async (e) => {
        e.preventDefault();
        await register(localStorage.getItem("user-login"), event.id);
        const content = "Succssfully registered for " + event.eventName + ". Navigate to your timeline to see your upcoming events!";
        alert(content);
    }

    return (
        <div style={{ paddingBottom: "10px" }}>
            <Card sx={{ width: 250, backgroundColor: "#D2D2D2", borderRadius: 5, paddingBottom: "5px" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={event.banner}
                    alt={event.eventName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="spacing">
                        {event.eventName}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Date: </b>{event.date}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Start: </b>{event.timeStart} <b>  |  End: </b>{event.timeEnd}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Phone: </b>{event.phone}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Email: </b>{event.email}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Capacity: </b>{event.capacity}
                    </Typography>
                    <Typography paddingTop="10px" variant="body2" color="text.secondary" className="spacing">
                        {event.description}
                    </Typography>
                </CardContent>

                <CardActions>
                    {displayRegister}
                    <Button className="reg-button" style={{ margin: "auto", marginBottom: 5 }} size="small" onClick={props.showCard}>Close</Button>
                </CardActions>
            </Card>
        </div>
    );
}