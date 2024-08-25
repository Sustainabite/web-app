'use client'

import { Button, Container, Grid, TextField, Box, FilledInput, InputAdornment, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import GoogleAuthButton from '@/app/ui/buttons/google-button';
import TextBetweenLine from '@/app/ui/text/text-between-line';
import { supabase_client } from '@/utils/supabase/client';
import AuthCard from '@/app/ui/card/BasicCard';
import { cleanAndValidateInput, isValidEmail, minLength, notEmpty } from '@/utils/functions/clean-input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import BasicCard from '@/app/ui/card/BasicCard';
import AuthForm from '@/app/ui/auth/auth-form';

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
    const [formError, setFormError] = useState<string | null>(null);  // New state for form errors


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    /**
     * @description Handles the validation and sign-up process when the Sign Up button is clicked.
     */
    async function LoginButtonHandler(type: RegisterType){


        //Normal Sign Up
        const emailValidation = cleanAndValidateInput(email, [notEmpty, isValidEmail]);
        const passwordValidation = cleanAndValidateInput(password, [notEmpty, minLength(8)]);
        
        setEmailErrors(emailValidation.errors);
        setPasswordErrors(passwordValidation.errors);

        if (type === "Basic") {
            if(emailValidation.isValid && passwordValidation.isValid){
                
                const {data, error} = await supabase_client.auth.signInWithPassword({email: email, password: password, options: {}})
                
                if (error) {
                    setFormError("Invalid email or password. Please try again.");
                    // Handle error (e.g., show a message to the user)
                } else if (data.user) {
                    // Redirect to the dashboard after successful signup
                    router.replace('/dashboard');
                }
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
                    <AuthForm
                    title="Welcome back"
                    googleText='Sign in with Google'
                    buttonText="Login"
                    onSubmit={() =>  LoginButtonHandler("Basic")}
                    switchText="Don't have an account?"
                    switchLink="Register"
                    onSwitch={() => router.push('/register')}
                    >
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
                        {/* Error Message Display */}
                        {formError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {formError}
                            </Typography>
                        )}
                    </AuthForm>
                </Grid>
            </Grid>
        </Container>
    )
}
