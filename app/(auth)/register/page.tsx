'use client'

import { Button, Container, Grid, makeStyles, TextField, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import GoogleAuthButton from '@/app/ui/buttons/google-button';
import TextBetweenLine from '@/app/ui/text/text-between-line';



const classes =  {
    container: {
      display: "flex",
      alignItems: "center"
    },
    border: {
      borderBottom: "2px solid lightgray",
      width: "100%"
    },
    text_input: {
        borderRadius: 10,
        disableUnderline: true
    }
};


type RegisterType = "Google" | "Base"

export default function Page() {
     
    
    const [email, setEmail] = useState<string>("")
	// const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
	/**
	 * @description 
	 */
	async function SignUpButtonHandler(type: RegisterType){
		
		// Attempt to sign up te user
        // await SignupCreator(email, username, password)

    }

    return (
        <Container
            sx={{
                display: 'flex',
                width: {sm: "100%", md: "80%"},
                height: {sm: "100%", md: "80%"},
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
                // backgroundColor: 'red'
            }}
            id="SignUp"
            >       
                <Grid container >
                    {/*Additional Info*/}
                    <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'orange' }}>
                        <h6>Good point 1</h6>
                        <h6>Good point 2</h6>
                        <h6>Good point 3</h6>
                    </Grid>

                    {/*Register Form*/}
                    <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',  px: 4}}>
                        <Box sx={{padding: 10, borderWidth: 2, borderRadius: 10, borderColor: 'white', boxShadow: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            
                            <Box
                            sx={{
                                width: { sm: '100%', md: '100%', },
                                textAlign: { sm: 'center', md: 'center' }
                            }}>
                                <Typography component="h5" variant="h5" color="text.primary">
                                    Create free account
                                </Typography>
                            </Box>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <GoogleAuthButton text='Sign up with Google' onClick={() => console.log("test")}/>
                            </Box>
                            

                            {/**/}
                            <TextBetweenLine text='Or sign up with email'/>

                            <Grid container spacing={2}>
                                {/*Contact form*/}
                                <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                    width: '98%', height: '100%', gap: 2  }}>
                                        <TextField placeholder="Email" variant="outlined" size='medium' onChange={(e) => setEmail(e.target.value)} value={email} InputProps={{style: classes.text_input}}/>
                                        <TextField placeholder="Username" variant="outlined" size='medium' onChange={(e) => setUsername(e.target.value)} value={username} InputProps={{style: classes.text_input}}/>
                                        <TextField placeholder="Password" type="password" variant="outlined" size='medium' onChange={(e) => setPassword(e.target.value)} value={password} InputProps={{style: classes.text_input}}/>
                                        
                                        <Button variant="contained" color="primary" >
                                            Sign Up
                                        </Button>
                                        <h6>By signing up, you agree to our Terms and conditions.</h6>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        

                        {/* <Snackbar
                        open={openPopup}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={popupMessage}
                        action={action}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        /> */}
                    </Grid>
                </Grid>

                   

        </Container>
    )
}
