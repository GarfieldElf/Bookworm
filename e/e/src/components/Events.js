import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./UserPage.css";
import SidebarData from "./SidebarData.js";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TextareaAutosize from "@mui/material/TextareaAutosize";
import Card from '@mui/material/Card';

import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import axios from "axios";

import HomeIcon from '@mui/icons-material/Home';
import ReorderIcon from '@mui/icons-material/Reorder';

const Events = () => {

    useEffect(() => {

        axios.get(`https://localhost:7024/api/Event`)
         
            .then((response) => {
            setEvents((data) => {
                return response.data;

            })

            }) 

    })

  
    const { userId } = useParams()

    var tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 7);  //günü bir hafta sonrasýna set ediyor

    const [select, setSelect] = useState("Book Reading"); //event tiplerini filtreleme

    const [events, setEvents] = useState([]); 

    const [comment, setComment] = useState(""); //yorum kýsmý 

    const [bookname, setBookname] = useState(""); //kitap ismi//

    const [choose, setChoose] = useState("eventtype"); //event tipi seçme

    const [enroll, setEnroll] = useState(3);  //kisi sayisi//

    const [date, setDate] = useState(dayjs(tomorrow)); //date

    const [time, setTime] = useState(null);  //time

    const [open, setOpen] = useState(false);

    const handleChange = (event) => { //event typelarý filtrelemek için //
        setSelect(event.target.value);
    };

    const handleventype = (event) => {  //eventin type kýsmýný oluþturmalarý için//
        setChoose(event.target.value);
    };

    const handlenrolled = (event) => { //kaç kiþinin katýlacaðýný seçmeleri için//
        setEnroll(event.target.value);
    };

    const handledate = (newValue) => { //event tarihini belirlemek  için//
        setDate(newValue);
    };

    const handletime = (newValuee) => { //event zamanýný belirlemek  için//
        setTime(newValuee);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeBookName = (event) => {  
        setBookname(event.target.value)
    }

    const onChangeComment = (event) => {
        setComment(event.target.value)
    }

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {

        setSubnav(!subnav);
    }


    const ShowEvent = (eventt) => {
        navigate(`/eventinformation/${userId}/${eventt.eventId}`, { state: { eventt: eventt } });
    }

    const navigate = useNavigate();

    function AddEvent() {

        var payload = {

            bookName: bookname,
            comments: comment,
            enrolledUsers: enroll,
            eventType: choose,
            eventDate: date,
            eventTime: time

        }


        axios.post(`https://localhost:7024/api/Event`, payload)

                .then((response) => {
                    navigate(`/events/${userId}`);

                })

    }

    return (

    <Box sx={{ bgcolor: '#B79DEE', height: '100vh' }} >
           

            <nav className="nav-menu active">
                <div >
                    {SidebarData.map((item, index) => {
                        return (
                            <div>
                                <Stack direction="column" >
                                    <Link className="anamenu" to={`/homepage/${userId}`}><HomeIcon />
                                        <span >  Home Page</span>
                                    </Link>
                                    <Link className="anamenu" to={`/events/${userId}`}><ReorderIcon />
                                        <span>  Events</span>
                                    </Link>
                                </Stack>

                                <Stack direction="column" >
                                    <Stack className="nav-text" >
                                        <Link to={item.path} onClick={item.subNav && showSubnav}>
                                            <div>
                                                <span>{item.title} {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</span>
                                            </div>

                                        </Link>
                                    </Stack>

                                    {subnav && item.subNav.map((item, index) => {


                                        return (


                                            <Link className="submenu" to={item.path + `${userId}`} key={index}>
                                                <span>{item.title}</span>
                                            </Link>

                                        )
                                    })}



                                </Stack>
                            </div>


                        )
                    })}

                </div>
            </nav>

           <Stack pt={5} ml={20} direction="row" style={{ display: 'flex', justifyContent:"space-evenly" }}>
                <Box  sx={{ height: "10vh", width: "40vh", bgcolor: "#28FAD4", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "black" }}>
                    Events</Box>

           
                <Stack direction="column" spacing={4}>
                    <Dialog
                        maxWidth="lg" open={open} onClose={handleClose}>
                        <DialogContent sx={{ bgcolor: "wheat" }}>
                            <Stack direction="row" justifyContent="space-evenly" mb={4} mt={2}>
                        <FormControl sx={{ minWidth: 120}} size="small">
                            <Select

                                value={choose}
                                onChange={handleventype}
                            >
                                <MenuItem value={"eventtype"} disabled >Select Event Type</MenuItem>
                                <MenuItem value={"Book Reading"}>Book Reading</MenuItem>
                                <MenuItem value={"Book Discussing"}>Book Discussing</MenuItem>
                            </Select>
                        </FormControl>

                                <Grid mt={1}>Select Total Participants:</Grid>   
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <Select

                                value={enroll}
                                onChange={handlenrolled}
                            >
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                            </FormControl>

                            <TextField placeholder="Book Name" size="small" value={bookname} onChange={onChangeBookName} ></TextField>
                            </Stack>
                            <Grid container justifyContent="center">
                            <TextareaAutosize
                                    placeholder="Add Comment about Event..."
                                style={{ maxWidth: "900px", minHeight: "60px", maxHeight: "100px", minWidth:"900px" }}
                                value={comment}
                                onChange={onChangeComment}
                        
                            />
                            </Grid>
                            <Stack direction="row" justifyContent="space-evenly" mt={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid mt={2}>Select Event Date:</Grid>
                                <DesktopDatePicker
                                    value={date}
                                    inputFormat="YYYY/MM/DD"
                                    minDate={dayjs(tomorrow)}
                                    onChange={handledate}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                    <Grid mt={2}>Select Event Time:</Grid>   
                                <TimePicker
                                    value={time}
                                    ampm={false}
                                    onChange={handletime}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            </Stack>
                    </DialogContent>
                        <DialogActions sx={{ bgcolor: "wheat" }}>
                            <Stack direction="row"  spacing={91}>
                            <Button variant="contained" sx={{ "&:hover": { backgroundColor: "#9451A8" }, bgcolor: '#540D77', }} onClick={handleClose}>Cancel</Button>
                         <Button variant="contained" sx={{ "&:hover": { backgroundColor: "#9451A8" }, bgcolor: '#540D77', }} onClick={() => { AddEvent(); handleClose() }} >Add Event</Button>
                            </Stack>
                    </DialogActions>
                    </Dialog>
                </Stack>

             <Stack spacing={1} mr={20 } style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
             <Grid sx={{ height: "5vh", width: "30vh", bgcolor: "#28FAD4", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "black" }}>Event Type:</Grid>
             <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
          
                     value={select}
                    onChange={handleChange}

               >
               <MenuItem value={"Book Reading"}>Book Reading</MenuItem>
               <MenuItem value={"Book Discussing"}>Book Discussing</MenuItem>
               </Select>
                    </FormControl>
               </Stack>



                <Stack style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button onClick={handleClickOpen} variant="contained" sx={{ "&:hover": { backgroundColor: "#FFC9B3" }, bgcolor: '#7BF0DB', color: "black" }}>Create Event</Button>
                </Stack>

            </Stack>


            <Stack spacing={5} direction="row" style={{ display: "flex" }} ml={34} mt={3}>

                {
                    events.filter(eventt => eventt.eventType === select).map((eventt) => (
                        <Button onClick={() => ShowEvent(eventt)} sx={{ textTransform: "capitalize" }}>
                        <Card key={eventt.eventId} sx={{ bgcolor: '#540D77', minHeight: '10vh', color: "wheat", minWidth: "20vh" }}>
                                <Stack mt={1} direction="column" spacing={1} style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                                    <Grid>{eventt.bookName}</Grid>
                                    <Grid>{eventt.eventType}</Grid>
                                </Stack>
                            </Card>
                        </Button>

                    )

                    )}
             

        </Stack>
         
    </Box>

  )


}

export default Events;
