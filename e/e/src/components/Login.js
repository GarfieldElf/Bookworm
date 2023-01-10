import React from 'react';
import  { useState } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useNavigate } from 'react-router-dom';

const Login = () => { 


    const navigate = useNavigate();

    const [username, setUsername] = useState(""); //Kullanýcý adý kýsmý

    const [password, setPassword] = useState(""); //Þifre adý kýsmý

    const [email, setEmail] = useState(""); //Email kýsmý

    const [fbook, setFbook] = useState(""); // favori kitap kýsmý

    const [open, setOpen] = useState(false); //success alertini göstermek için//


    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }


    const onChangeFbook = (event) => {
        setFbook(event.target.value)
    }


    const handleClick = () => { //success aleti gösterme fonksiyonu
        setOpen(true);
    };

    const handleClose = (event, reason) => {  // alert duration için

        setOpen(false);
    };


    function AddUser() {

        var payload = {

            username: username,
            email: email,
            userPassword: password,
            favouriteBook: fbook

        }


         axios.post(`https://localhost:7024/api/Registration`, payload)

             .then((response) => {
                 handleClick();
                 navigate("/");
                
             })

    }

    return (

        <Stack sx={{ bgcolor: '#540D77', height: '100vh' }} direction="column" 
            alignItems="center"
           
               > 

            <Grid>
              <Box color="white" fontSize="10vh" >BookWorm</Box>
            </Grid>

            <Box
                sx={{borderRadius:50}}
                bgcolor="#76ECE4"
                height="600px"
                width="700px"
            >

                <Stack alignItems="center" mt={3} >
                    <Box color="#540D77" fontSize="4vh" >Create Account</Box>
                </Stack>

                <Stack direction="column" spacing={5} alignItems="center" mt={3} >
                    <TextField size="small" value={username} onChange={onChangeUsername} placeholder="Username" InputProps={{ inputProps: { style: { color: "#8F00E2" } } }}></TextField>
                    <TextField size="small" value={email} onChange={onChangeEmail} placeholder="Email Adress" InputProps={{ inputProps: { style: { color: "#8F00E2" } } }}></TextField>
                    <TextField size="small" value={password} onChange={onChangePassword} placeholder="Password" type="password" InputProps={{ inputProps: { style: { color: "#8F00E2" } } }}></TextField>
                    <TextField size="small" value={fbook} onChange={onChangeFbook} placeholder="Favourite Book" InputProps={{ inputProps: { style: { color: "#8F00E2" } } }}></TextField>
                    <Button variant="contained" onClick={AddUser} sx={{ "&:hover": { backgroundColor: "#9451A8" }, bgcolor: '#540D77', }} 
                    >Create Account</Button>
                    <Button as={Link} to='/sign' sx={{ color: "#700D8E" }}>Have an account? Sign in</Button>
               </Stack>
            </Box>

           

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >
             <MuiAlert onClose={handleClose} sx={{ width: '100%' }} variant="filled" severity="success">your account has been created successfully</MuiAlert>
            </Snackbar>
            
            

        </Stack>



    )


}

export default Login;
