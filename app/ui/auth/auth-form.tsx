import { Box, Button, Grid } from '@mui/material';
import BasicCard from '../card/BasicCard';
import GoogleAuthButton from '@/app/ui/buttons/google-button';
import TextBetweenLine from '@/app/ui/text/text-between-line';
import { supabase_client } from '@/utils/supabase/client';

interface AuthFormProps {
    title: string;
    googleText: string;
    buttonText: string;
    onSubmit: () => void;
    children: React.ReactNode;
    switchText: string;
    switchLink: string;
    onSwitch: () => void;
}

export default function AuthForm({
    title,
    buttonText,
    googleText,
    onSubmit,
    children,
    switchText,
    switchLink,
    onSwitch,
}: AuthFormProps) {

    async function GoogleAuth(){
        await supabase_client.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/api/auth/callback`
            }
        });

        return
    }

    return (
        <BasicCard title={title}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <GoogleAuthButton text={googleText} onClick={GoogleAuth} />
            </Box>

            <TextBetweenLine text={`Or ${buttonText} with email`} />
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',  gap: 2}}>
                    {children}
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        {buttonText}
                    </Button>
                    
                    <h6>By signing up, you agree to our Terms and conditions.</h6>

                    <h6>
                        {switchText}
                        <Button 
                        variant="text" 
                        color="primary" 
                        onClick={onSwitch}
                        sx={{ textTransform: 'none' }}
                        >
                        {switchLink}
                        </Button>
                    </h6>
                </Grid>
            </Grid>

            

        </BasicCard>
    );
}
