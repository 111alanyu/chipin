import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function EventCard() {
    return (

        <Card sx={{
            maxWidth: 950,
            maxHeight: 150,
            boxShadow: 20,
            backgroundColor: "#FFB743",
            borderRadius: 3,
            display: 'flex',
            display: 'inline-flex',
            positon: 'absolute',

        }}>
            <div className="Centering">

                <CardMedia
                    component="img"
                    height="250"
                    image="https://picsum.photos/200.jpg"
                    alt="green iguana"
                />
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                        Lizard
                    </Typography>

                    <Typography variant="body2" color="white" maxWidth={400} fontSize="5">
                        Date/Time: June 5th 1PM-3PM
                    </Typography>
                    <Typography variant="body2" color="white" maxWidth={400}>
                        Location: UCLA,
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        alignContent: 'space-around',
                        flexDirection: 'column',
                        p: 1,
                        m: 1,
                        borderRadius: 10,
                    }}
                >

                    <Button
                        sx={{
                            outline: 'outset',
                            width: 70,
                            padding: 2,
                            marginTop: 2,
                            marginBottom: 2
                        }}
                        size="small"
                    >Locate</Button>
                    <Button
                        sx={{
                            outline: 'outset',
                            width: 70,
                            padding: 2,
                            marginBottom: 2
                        }}
                        size="small">Register</Button>
                </CardActions>
            </Box>
        </Card >
    );
}