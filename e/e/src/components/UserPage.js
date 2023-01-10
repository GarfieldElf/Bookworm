import React, { useState ,useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search'; //search ikonu//
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarData from "./SidebarData.js";
import "./UserPage.css";
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReorderIcon from '@mui/icons-material/Reorder';
import SubMenu from "./SubMenu.js";
import axios from "axios";



const UserPage = () => {

    var [user, setUsers] = useState([]);
  
    const location = useLocation();

    const navigate = useNavigate();

    const { userId } = useParams();


    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {

        setSubnav(!subnav);
    }


    const handlepage = () => {
      
        { 
            navigate(`/settings/${userId}`);      
                   
        }  

    }

    const handleLogout = () => {

        navigate("/");
    }

    useEffect((user) => {

        axios.get(`https://localhost:7024/api/Registration/${userId}`)
            .then((response) => {
                setUsers((data) => {
                    return response.data;

                })
              
            })
         

    });

    
  
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

             <Stack pt={5} direction="row" style={{ display: 'flex', justifyContent: "flex-end" }} spacing={30} >
               
                <Stack style={{ display: 'flex', justifyContent: "flex-end" }} direction="column" spacing={2}>
                    <Stack direction="row" style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button onClick={handleLogout }> <LogoutIcon style={{ color: "black", fontSize: "33px" }} /></Button>
                        <img style={{ width: 150, height: 150 }} src="/avatars/avatar1.png"></img>
                        <Button onClick={handlepage}> <SettingsIcon style={{ color: "black", fontSize: "40px" }} /></Button>
                    </Stack>
                    <Stack style={{ display: 'flex', justifyContent: "center", textAlign: "center" }} >

                        <Grid>Welcome {user.username}!</Grid>
                        <Grid>Favourite Book: {user.favouriteBook}</Grid>
                        <Button as={Link} sx={{ color: "#44FFE7", textDecoration: 'none' }}>My Readlist</Button>
                        <Button as={Link} sx={{ color: "#6A06FF", textDecoration: 'none' }}>My Reviews</Button>
                    </Stack>
                </Stack>


                <Stack style={{ display: 'flex', justifyContent: "flex-end" }} pr={10} direction="row">
                 <TextField variant="outlined" placeholder="Search Book..."></TextField>
                 <Button as={Link}><SearchIcon style={{ color: "black", fontSize: "40px" }} /></Button>
                </Stack>





            </Stack>

          

          


        </Box>


        )






}


export default UserPage;