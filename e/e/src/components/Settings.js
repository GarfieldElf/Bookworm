import React from 'react';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const Settings = () => {

    const [openavatar, setOpenavatar] = useState(false);

    const uname = useRef("");

    const password = useRef("");

    const fbook = useRef("");

    const email = useRef("");

    const [open, setOpen] = useState(false); //success alertini göstermek için//

    const handleClick = () => { //success aleti gösterme fonksiyonu
        setOpen(true);
    };

    const handleClosee = (event, reason) => {  // alert duration için

        setOpen(false);
    };


    const navigate = useNavigate();

    const { userId } = useParams();

  
    const handlebackpage = () => {

        navigate(`/homepage/${userId}`);
    }


    useEffect(() => {
        axios.get(`https://localhost:7024/api/Registration/${userId}`)
            .then((response) => {

                uname.current.value = response.data.username;
                password.current.value = response.data.userPassword;
                fbook.current.value = response.data.favouriteBook;
                email.current.value = response.data.email;
            })});


  

    const onopenavatars = () => {
        setOpenavatar(true);
    }

    const handleClose = () => {
        setOpenavatar(false);
    };

    function updateUser() {

        var payload = {
            email: email.current.value,
            username: uname.current.value,
            userPassword: password.current.value,
            favouriteBook: fbook.current.value,
            userId: userId,
        }
        axios
            .put(`https://localhost:7024/api/Registration`, payload)
            .then((response) => {

                handleClick();
            })

    }


    return (

        <Stack sx={{ bgcolor: '#B79DEE', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center" }} >
            

            <Box sx={{ bgcolor: '#540D77', height: '80vh', borderRadius: 10, width: "120vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

                <Stack direction="column" style={{ display: "flex", justifyContent: "center", alignItems: "center" } }>

                    <img style={{ width: 150, height: 150 }} src="/avatars/avatar1.png"></img>
                    <Button onClick={onopenavatars} sx={{ color: "#6FFFED", display: "flex", justifyContent: "center" }}>Change Avatar</Button>

                    <Dialog maxWidth="xl" open={openavatar} onClose={handleClose} >
                        <DialogContent sx={{ bgcolor: "wheat" }}>

                            <Stack direction="row" mb={2} mt={2} spacing={3}>

                            <Button>
                            <img style={{ width: 150, height: 150 }} src="../avatars/avatar1.png" alt="avatar_1"></img>
                            </Button>

                           <Button>
                           <img style={{ width: 150, height: 150 }} src="../avatars/avatar2.png" alt="avatar_2"></img>
                           </Button>


                           <Button>
                           <img style={{ width: 150, height: 150 }} src="../avatars/avatar3.png" alt="avatar_3"></img>
                           </Button>

                           <Button>
                           <img style={{ width: 150, height: 150 }} src="../avatars/avatar4.png" alt="avatar_4"></img>
                           </Button>


                            </Stack>
                      

                            <Stack direction="row" mb={2} mt={2} spacing={3}>

                                <Button>
                                <img style={{ width: 150, height: 150 }} src="../avatars/avatar5.png" alt="avatar_5"></img>
                                </Button>

                                <Button>
                                <img style={{ width: 150, height: 150 }} src="../avatars/avatar6.png" alt="avatar_6"></img>
                                </Button>


                                <Button>
                                <img style={{ width: 150, height: 150 }} src="../avatars/avatar7.png" alt="avatar_7"></img>
                                </Button>

                                <Button>
                                <img style={{ width: 150, height: 150 }} src="../avatars/avatar8.png" alt="avatar_8"></img>
                                </Button>


                            </Stack>

                         


                       </DialogContent>
                    </Dialog>
                   
                    <Grid mb={2} mt={1} sx={{ color: "white" }}>Change Username</Grid>
                    <input style={{ height: "20px", fontSize: "20px", width: "210px" }} ref={uname} sx={{ bgcolor: "white" }} size="small"></input>

                    <Grid mb={2} mt={1} sx={{ color: "white" }}>Change Password</Grid>
                    <input style={{ height: "20px", fontSize: "20px", width: "210px" }} ref={password} sx={{ bgcolor: "white" }} size="small"></input>

                 
                    <Grid mb={2} mt={1} sx={{ color: "white" }}>Change Favourite Book</Grid>
                    <input style={{ height: "20px", fontSize: "20px", width:"210px" }} ref={fbook} sx={{ bgcolor: "white" }} size="small"></input>

                    <Grid mb={2} mt={1} sx={{ color: "white" }}>Change Email</Grid>
                    <input style={{ height: "20px", fontSize: "20px", width: "210px" }} ref={email} sx={{ bgcolor: "white" }} size="small"></input>

              
                    
                    <Stack spacing={55} direction="row" style={{ display: "flex", justifyContent: "space-between"}}> 
                        <Button sx={{ color: "#6FFFED" }} onClick={updateUser}>Save Changes</Button>
                    <Button onClick={handlebackpage} sx={{ color: "#6FFFED", display: "flex", justifyContent: "center" }}>Back</Button>
                    </Stack>

                </Stack>




                <Snackbar open={open} autoHideDuration={5000} onClose={handleClosee} >
                    <MuiAlert onClose={handleClose} sx={{ width: '100%' }} variant="filled" severity="success">your information has been successfully updated </MuiAlert>
                </Snackbar>


            </Box>





        </Stack>

        )







}


export default Settings;