'use client'

import { Button, Container, Grid, TextField, Box, FilledInput, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import GoogleAuthButton from '@/app/ui/buttons/google-button';
import TextBetweenLine from '@/app/ui/text/text-between-line';
import { supabase_client } from '@/utils/supabase/client';
import AuthCard from '@/app/ui/auth/auth-card';
import { cleanAndValidateInput, isValidEmail, minLength, notEmpty } from '@/utils/functions/clean-input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';

const classes =  {
    text_input: {
        borderRadius: 10,
        disableUnderline: true
    }
};

type RegisterType = "Google" | "Basic"

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    /**
     * @description Handles the validation and sign-up process when the Sign Up button is clicked.
     */
    async function LoginButtonHandler(type: RegisterType){
        
        //Google Sign up
        if(type === "Google"){

            //Initiates Google Sign in process popup and redirects to below URL, appending an authorization code to URL
            //The authorization code is used as a temporary token to securely exchange on the server side for a session
            await supabase_client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/api/auth/callback`
                }
            });

            return
        } 

        //Normal Sign Up
        const emailValidation = cleanAndValidateInput(email, [notEmpty, isValidEmail]);
        const passwordValidation = cleanAndValidateInput(password, [notEmpty, minLength(6)]);
        
        setEmailErrors(emailValidation.errors);
        setPasswordErrors(passwordValidation.errors);

        if (type === "Basic") {
            if(emailValidation.isValid && passwordValidation.isValid){
                
                await supabase_client.auth.signUp({email: email, password: password, options: {}})

                //Add move to dashboard
            }
        } else {
            console.log("Validation failed");
        }
    }

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                
                py: { xs: 8, sm: 10 },
                textAlign: 'center',
            }}
            id="Login"
        >       
             <Grid container justifyContent="center" alignItems="center">
                {/* Register Form */}
                <Grid item xs={12} sm={12} md={7} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',  px: 4}}>
                    <AuthCard title='Welcome back'>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <GoogleAuthButton text='Sign in with Google' onClick={() => LoginButtonHandler("Google")} />
                        </Box>

                        <TextBetweenLine text='Or login with email' />

                        <Grid container spacing={2}>
                            {/* Contact form */}
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '98%', height: '100%', gap: 2  }}>
                                    <TextField
                                        placeholder="Email"
                                        variant="outlined"
                                        size="medium"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={emailErrors.length > 0}
                                        helperText={emailErrors.join(', ')}
                                        InputProps={{style: classes.text_input}}
                                    />
                                    <TextField
                                    placeholder="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    size="medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={passwordErrors.length > 0}
                                    helperText={passwordErrors.join(', ')}
                                        InputProps={{
                                            style: classes.text_input,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    
                                    <Button variant="contained" color="primary" onClick={() => LoginButtonHandler("Basic")}>
                                        Login
                                    </Button>
                                    <h6>
                                        Don't have an account?
                                        <Button 
                                            variant="text" 
                                            color="primary" 
                                            onClick={() => router.push('/register')}
                                            sx={{textTransform: 'none'}} // Optional: To keep the button text case as-is
                                        >
                                            Register
                                        </Button>
                                        
                                    </h6>
                                </Box>
                            </Grid>
                        </Grid>
                    </AuthCard>
                </Grid>
            </Grid>
        </Container>
    )
}
