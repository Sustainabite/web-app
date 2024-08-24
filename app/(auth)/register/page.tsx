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
import { revalidatePath } from 'next/cache';

const classes =  {
    text_input: {
        borderRadius: 10,
        disableUnderline: true
    }
};

type RegisterType = "Google" | "Basic"

/**
 * @description Register Page 
 * @author Matt
 */
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
    async function SignUpButtonHandler(type: RegisterType){
        
        //Google Sign up
        if(type === "Google"){
            await supabase_client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: "http://localhost:3000/dashboard"
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
                 
                const {error} = await supabase_client.auth.signUp({email: email, password: password, options: {}})
                
                // if(error){
                //     redirect('/error')
                // }

                //Revalidate paths that might change with sign in user
                //revalidatePath('/', 'layout')
                //Add move to dashboard
                //redirect('/dashboard')
            }
        } else {
            console.log("Validation failed");
        }
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
            }}
            id="SignUp"
        >       
            <Grid container >
                {/* Additional Info */}
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'orange' }}>
                    <h6>Good point 1</h6>
                    <h6>Good point 2</h6>
                    <h6>Good point 3</h6>
                </Grid>

                {/* Register Form */}
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',  px: 4}}>
                    <AuthCard title='Create free account'>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <GoogleAuthButton text='Sign up with Google' onClick={() => SignUpButtonHandler("Google")} />
                        </Box>
                        
                        <TextBetweenLine text='Or sign up with email' />

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
                                     
                                    <Button variant="contained" color="primary" onClick={() => SignUpButtonHandler("Basic")}>
                                        Sign Up
                                    </Button>
                                    <h6>By signing up, you agree to our Terms and conditions.</h6>
                                    
                                   
                                    <h6>
                                        Already have an account? 
                                        <Button 
                                            variant="text" 
                                            color="primary" 
                                            onClick={() => router.push('/login')}
                                            sx={{textTransform: 'none'}} // Optional: To keep the button text case as-is
                                        >
                                            Login 
                                        </Button>
                                        instead
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
