import React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { Link,useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Sign = () => {

    const [users, setUsers] = useState([]); 

    const [password, Setpassword] = useState("");  //þifre kýsmý

    const [userName, Setusername] = useState(""); //username kýsmý

    const [open, setOpen] = useState(false); //success alertini göstermek için//

    const navigate = useNavigate();

    const handleClick = () => { //success aleti gösterme fonksiyonu
        setOpen(true);
    };

    const handleClose = (event, reason) => {  // alert duration için

        setOpen(false);
    };

    const onChangeUsername = (event) => {  //username için
        Setusername(event.target.value)
    }

    const onChangePassword = (event) => { //þifre için
        Setpassword(event.target.value)
    }

    useEffect(() => {

        axios.get(`https://localhost:7024/api/Registration`)

            .then((response) => {
                setUsers((data) => {
                    return response.data;

                })

            })
        
    })

    const handlepage = (e) => {

        e.preventDefault();
        {
            users.map((user) => {

                if (user.username === userName && user.userPassword === password) {

                    navigate(`/homepage/${user.userId}`);
                }

                else {

                    handleClick();
                    
                }

            })

        }


    }

    return (

        <Stack sx={{ bgcolor: '#76ECE4', height: '100vh' }} direction="column"
            alignItems="center"

        > 


            <Grid>
             <Box color="black" fontSize="10vh" >BookWorm</Box>
            </Grid>

            <Box mt={3}
                sx={{ borderRadius: 50 }}
                bgcolor="#540D77"
                height="550px"
                width="600px"
            >


                <Stack alignItems="center" mt={8} >
                 <Box color="#76ECE4" fontSize="4vh" >Sign In</Box>
                </Stack>

                <Stack direction="column" spacing={5} alignItems="center" mt={3} >
                    <TextField size="small" value={userName} onChange={onChangeUsername} placeholder="Username" InputProps={{ inputProps: { style: { color: "white" } } }}></TextField>
                    <TextField size="small" value={password} onChange={onChangePassword} placeholder="Password" type="password" InputProps={{ inputProps: { style: { color: "white" } } }}></TextField>
                    <Button onClick={handlepage} variant="contained" sx={{ "&:hover": { backgroundColor: "#0E97A6" }, bgcolor: '#76ECE4', color: "black" }}
                 >Sign In</Button>
                </Stack>

                <Stack direction="column" spacing={2} alignItems="center" mt={3}>
                    <Grid color="white" >Don't have an account?  </Grid>
                    <Button as={Link} to="/" sx={{ color: "#76ECE4" }}> Create Account</Button>
                </Stack>


            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >
             <MuiAlert onClose={handleClose} sx={{ width: '100%' }} variant="filled" severity="error">Username or Password incorrect</MuiAlert>
            </Snackbar>
             




            </Box>





        </Stack>






 )


}

export default Sign;