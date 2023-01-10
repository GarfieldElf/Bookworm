import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./UserPage.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ShowEvents = () => {

    const location = useLocation();

    const { userId } = useParams();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false); //success alertini göstermek için//

    const handleback = () => {  //event sayfasýna geri dönmek için

        navigate(`/events/${userId}`);

    };

    const handleClick = () => { //success aleti gösterme fonksiyonu
        setOpen(true);
    };

    const handleClose = (event, reason) => {  // alert duration için

        setOpen(false);
    };

    let date = new Date(location.state.eventt.eventDate).toLocaleDateString(); //sadece date formunu alýr
    let time = new Date(location.state.eventt.eventTime).toLocaleTimeString(); //sadece time formunu alýr

    useEffect(() => {
      
        axios.get(`https://localhost:7024/api/Event/${location.state.eventt.eventId}`)
            .then((response) => {
                location.state.eventt.counterEnrolled = response.data.counterEnrolled;
                location.state.eventt.eventDate = response.data.eventDate;
                location.state.eventt.eventTime = response.data.eventTime;
                location.state.eventt.eventId = response.data.eventId;
                location.state.eventt.eventType = response.data.eventType;
                location.state.eventt.comments = response.data.comments;
                location.state.eventt.enrolledUsers = response.data.enrolledUsers;
                location.state.eventt.bookName = response.data.bookName;
                location.state.event.setDisabled = response.data.setDisabled;
            })
           
    });

    function UpdateEnrolledUsers() {

        if (location.state.eventt.counterEnrolled < location.state.eventt.enrolledUsers) {

            location.state.eventt.counterEnrolled = location.state.eventt.counterEnrolled + 1;
            location.state.eventt.setDisabled = true;

            var payload = {
                counterEnrolled: location.state.eventt.counterEnrolled,
                eventDate: location.state.eventt.eventDate,
                eventTime: location.state.eventt.eventTime,
                eventId: location.state.eventt.eventId,
                enrolledUsers: location.state.eventt.enrolledUsers,
                comments: location.state.eventt.comments,
                eventType: location.state.eventt.eventType,
                bookName: location.state.eventt.bookName,
                setDisabled: location.state.eventt.setDisabled,
            };

            axios.put(`https://localhost:7024/api/Event/`, payload)
                .then((response) => {

                    handleClick();
                })

        }
    }

    return (

        <Box sx={{ bgcolor: '#B79DEE', height: '100vh' }} >

            <Stack pt={5} direction="column" style={{ display: 'flex', justifyContent:"center" }}>
                <Stack justifyContent="center" direction="row" spacing={6} mb={5}>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "#540D77" }}>Bookname:</Grid>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: '#540D77', color: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center"}}>{location.state.eventt.bookName }</Grid>
                </Stack >
                <Stack justifyContent="center" direction="row" spacing={6} mb={5}>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "#540D77" }}>Event Type:</Grid>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: '#540D77', color: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center" }}>{location.state.eventt.eventType}</Grid>
                </Stack>
                <Stack justifyContent="center" direction="row" spacing={6} mb={5}>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "#540D77" }}>Event Date:</Grid>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: '#540D77', color: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center" }}>{date}</Grid>
                </Stack>
                <Stack justifyContent="center" direction="row" spacing={6} mb={5}>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "#540D77" }}>Event Time:</Grid>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: '#540D77', color: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center" }}>{time}</Grid>
                </Stack>

                <Stack justifyContent="center" direction="row" spacing={2} mb={5}>
                    <Grid mt={1.5} sx={{ borderRadius: 50, height: "5vh", width: "30vh", bgcolor: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "#540D77" }}>Host's Comment:</Grid>
                    <Grid sx={{ borderRadius: 50, maxWidth: "900px", minHeight: "60px", maxHeight: "100px", minWidth: "900px", bgcolor: '#540D77', color: "wheat", alignItems: "center", display: "flex", justifyContent: "center", color: "wheat" }}>{location.state.eventt.comments}</Grid>
                </Stack>

                <Stack justifyContent="center" direction="row" spacing={6} mb={5}>
                    <Grid sx={{ borderRadius: 50, height: "5vh", width: "20vh", bgcolor: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "#540D77" }}>Participants:</Grid>
                    <Grid sx={{borderRadius: 50, height: "5vh", width: "20vh", bgcolor: '#540D77', color: "wheat", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center"}}>{location.state.eventt.counterEnrolled}/{location.state.eventt.enrolledUsers}</Grid>
                 <Button variant="contained" sx={{ "&:hover": { backgroundColor: "#9451A8" }, bgcolor: '#540D77', }} disabled={location.state.eventt.setDisabled} onClick={() => { UpdateEnrolledUsers(); handleClose() }}>Enroll</Button>
                </Stack>

               

         <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} >
         <MuiAlert onClose={handleClose} sx={{ width: '100%' }} variant="filled" severity="success">you enrolled an event successfully</MuiAlert>
         </Snackbar>

            </Stack>

            <Stack justifyContent="center" direction="row" spacing={6} mb={5}>
            <Button variant="contained" sx={{ "&:hover": { backgroundColor: "#9451A8" }, bgcolor: '#540D77', }} onClick={handleback}>Go Back</Button>
            </Stack>

        </Box>


        )







}

export default ShowEvents;