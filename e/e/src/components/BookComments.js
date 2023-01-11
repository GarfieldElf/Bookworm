import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./UserPage.css";
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import Card from '@mui/material/Card';

import "./UserPage.css";
import SidebarData from "./SidebarData.js";


import HomeIcon from '@mui/icons-material/Home';
import ReorderIcon from '@mui/icons-material/Reorder';



const BookComments = () => {

    let [tut, setTut] = useState([]);

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {

        setSubnav(!subnav);
    }

    const { bookId, userId } = useParams();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState("Recommended"); //öneriliyor mu önerilmiyor mu

    const newDate = new Date(); //bugünün tarihi


    const [comment, setComment] = useState(""); //kitap için yorum

    const onChangeComment = (event) => {
        setComment(event.target.value)
    }

    const onChangeR = (event) => {
        setValue(event.target.value);
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [books, setBooks] = useState([]);

    const [users, setUsers] = useState([]);

    const [comments, setComments] = useState([]);


    useEffect(() => {

        axios.get(`https://localhost:7024/api/Book/${bookId}`)
            .then((response) => {

                setBooks((data) => {
                    return response.data;

                })
            })

        axios.get(`https://localhost:7024/api/Registration/${userId}`)
            .then((response) => {

                setUsers((data) => {
                    return response.data;

                })
            })

     

        axios.get(`https://localhost:7024/api/BookComment`)
            .then((response) => {

                setComments((data) => {
                    return response.data;

                })
            })


    },[]);

    function AddComment(c) {

        if (c !== users.username) { 
            var payload = {

                bookId: books.bookId,
                bookComment: comment,
                isRecommended: value,
                username: users.username,
                datee: newDate,


            }



            axios.post(`https://localhost:7024/api/BookComment`, payload)

                .then((response) => {
                    navigate(`/bookinformation/${userId}/${bookId}`);

                })
            setComment("");


        }
        

    }



    return (

        <Box sx={{ bgcolor: '#B79DEE', minHeight: '100vh' }} >

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



            <Stack direction="row" ml={40} justifyContent="flex-start" >

                <Stack direction="column" mt={3} mb={3}>
                    <img style={{ width: 250, height: 350 }} src={books.bookCover}></img>
                    <Stack mt={2} ml={3 }>
                        <Button onClick={handleClickOpen} variant="contained" sx={{ height: "50px", width: "200px", "&:hover": { backgroundColor: "#0E97A6" }, bgcolor: '#76ECE4', color: "black" }}>Add Comment</Button>
                    </Stack>
                </Stack>
                <Stack >
                
                        <Grid ml={3} style={{ textDecoration: 'none', fontSize: "30px" }} ml={2} mt={3}>{books.bookName}-{books.bookAuthor}</Grid>
                       

                    <Grid mt={2} ml={3} mb={3} mr={4} sx={{ fontSize:"18px"}}>{books.bookSummary}</Grid>

                    <Box ml={3} mb={3}  variant="contained" sx={{ borderRadius: "15px", color: "wheat", bgcolor: '#540D77', width: "100px", alignItems: "center", display: "flex", justifyContent: "center", height:"50px"}}
                    >#{books.category}</Box>

                  
               

                </Stack>

            </Stack>

         


            <Dialog 
                maxWidth="lg" open={open} onClose={handleClose}>
                <DialogContent sx={{ bgcolor: "wheat" }}>
                    <Stack direction="column" spacing={2}>
                    <TextareaAutosize
                        placeholder="Add your Comment about Book..."
                        style={{ maxWidth: "900px", minHeight: "100px", maxHeight: "120px", minWidth: "900px" }}
                        value={comment}
                        onChange={onChangeComment}

                    />

                      <FormControl>
                        <RadioGroup
                       
                                value={value}
                                onChange={onChangeR}

                        >
                            <FormControlLabel value="Recommended"  control={<Radio />} label="Recommended" />
                            <FormControlLabel value="Not Recommended" control={<Radio />} label="Not Recommended" />
                        </RadioGroup>
                     </FormControl>

                    </Stack>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "wheat" }}>
               
                   
         <Button onClick={() => { AddComment(tut); handleClose() }} variant="contained" sx={{ height: "40px", width: "100px", "&:hover": { backgroundColor: "#0E97A6" }, bgcolor: '#76ECE4', color: "black" }}>Send</Button>
                          
                   
                </DialogActions>
            </Dialog>

            <Stack spacing={3} direction="column" style={{ display: "flex", justifyContent: "flex-start" }} mt={3} ml={35}>
                {comments.filter(c => c.bookId === books.bookId).map((c) => {
                    const date = new Date(c.datee).toLocaleDateString();
                    tut = c.username;
            
                    if (c.isRecommended === "Recommended")
                    
                    return (

                        <Card sx={{ bgcolor: 'wheat', minHeight: '20vh', color: "black", width: "162vh" }}>
                            
                            <Stack column="row" height="30px" bgcolor="green" color="white">
                                <Grid ml={1}> <ThumbUpRoundedIcon /> {c.isRecommended} by {c.username}</Grid>
                            </Stack>
                            <Stack ml={1} mt={1} direction="column" spacing={1} style={{ display: "flex", justifyContent: "center" }}>

                                <Grid>{date}</Grid>
                                <Grid>{c.bookComment}</Grid>
                            </Stack>
                        </Card>
                    )
                else {
                    return (
                        
                        < Card  sx = {{ bgcolor: 'wheat', minHeight: '20vh', color: "black", width: "162vh" }}>
                            <Stack  column="row" height="30px" bgcolor="red" color="white">
                                <Grid ml={1} > <ThumbDownRoundedIcon /> {c.isRecommended} by {c.username}</Grid>
                            </Stack>
                            <Stack ml={1} mt={1} direction="column" spacing={1} style={{ display: "flex", justifyContent: "flex-end" }}>

                                <Grid>{date}</Grid>
                                <Grid>{c.bookComment}</Grid>
                            </Stack>
                        </Card>
                    )



                }


            })}
  </Stack>


        </Box>



        )


}



export default BookComments;
