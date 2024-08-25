'use client'

import { Button, Container, Grid, TextField, Box, FilledInput, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { supabase_client } from '@/utils/supabase/client';
import { cleanAndValidateInput, isValidEmail, minLength, notEmpty } from '@/utils/functions/clean-input';
 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import AuthForm from '@/app/ui/auth/auth-form';

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

    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    /**
     * @description Handles the validation and sign-up process when the Sign Up button is clicked.
     */
    async function SignUpButtonHandler(type: RegisterType){

        //Normal Sign Up
        const emailValidation = cleanAndValidateInput(email, [notEmpty, isValidEmail]);
        const passwordValidation = cleanAndValidateInput(password, [notEmpty, minLength(8)]);
        
        setEmailErrors(emailValidation.errors);
        setPasswordErrors(passwordValidation.errors);

        if (type === "Basic") {
            if(emailValidation.isValid && passwordValidation.isValid){
                 
                const {data, error} = await supabase_client.auth.signUp({email: email, password: password, options: {}})
                
                if (error) {
                    console.error("Sign up error:", error.message);
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
                width: {sm: "100%", md: "80%"},
                height: {sm: "100%", md: "80%"},
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
            }}
            id="SignUp"
        >   
            <Grid container>
                {/* Additional Info */}
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'orange' }}>
                    <h6>Good point 1</h6>
                    <h6>Good point 2</h6>
                    <h6>Good point 3</h6>
                </Grid>

                {/* Register Form */}
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',  px: 4}}>
                    <AuthForm
                    title="Create free account"
                    googleText='Sign up with Google'
                    buttonText="Sign Up"
                    onSubmit={() => SignUpButtonHandler("Basic")}
                    switchText="Already have an account?"
                    switchLink="Login"
                    onSwitch={() => router.push('/login')}
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
                    </AuthForm>
                </Grid>
            </Grid>
        </Container>
    )
}
