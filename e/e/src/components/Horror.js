import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar, { genConfig } from 'react-nice-avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search'; //search ikonu//
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarData from "./SidebarData.js";
import "./UserPage.css";
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReorderIcon from '@mui/icons-material/Reorder';
import axios from "axios";



const Horror = () => {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    const { userId } = useParams();

    const category = "Horror";

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {

        setSubnav(!subnav);
    }

    useEffect(() => {

        axios.get(`https://localhost:7024/api/Book`)
            .then((response) => {
                setBooks((data) => {
                    return response.data;

                })

            })


    });

    const showbook = (bookss) => {

        navigate(`/bookinformation/${userId}/${bookss.bookId}`);

    }

    return (

        <Box sx={{ bgcolor: '#B79DEE', minHeight: '200px' }} >

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

                                    {subnav && item.subNav.map((item) => {


                                        return (


                                            <Link className="submenu" to={item.path +`${userId}`}>
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


            <Stack direction="row" ml={30} justifyContent="flex-start" >
                <Grid sx={{ height: "5vh", width: "31vh", bgcolor: "#28FAD4", fontSize: 25, alignItems: "center", display: "flex", justifyContent: "center", color: "black" }}>Horror</Grid>
            </Stack>



            {books.filter(bookss => bookss.category === category).map((bookss) => {

                return (
                    <Box>

                        <Stack direction="row" ml={40} justifyContent="flex-start" >
                            <Stack direction="column" mt={3} mb={3}>
                                <img style={{ width: 150, height: 200 }} src={bookss.bookCover}></img>
                            </Stack>
                            <Stack mt={3}>
                                <Button onClick={() => showbook(bookss)} style={{ textDecoration: 'none' }}  ml={2} mt={3}>{bookss.bookName}- {bookss.bookAuthor}</Button>
                            </Stack>


                        </Stack>
                    </Box>
                )
            })}


        </Box>






    )
}

export default Horror;