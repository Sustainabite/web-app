import SideNav from '@/app/ui/dashboard/sidenav';
import { Box, Typography } from '@mui/material';
 
type Props = {
    children: React.ReactNode;
    title: string;
}

/**
 * @description Card component with box shadow and title
 * @param param0 
 * @returns 
 */
export default function AuthCard({ children, title }: Props) {
	return (
		<Box sx={{padding: 10, borderWidth: 2, borderRadius: 10, borderColor: 'white', boxShadow: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            {/*Title*/}
            <Box
            sx={{
                width: { sm: '100%', md: '100%', },
                textAlign: { sm: 'center', md: 'center' }
            }}>
                <Typography component="h5" variant="h5" color="text.primary">
                    {title}
                </Typography>
            </Box>

            {children}
        </Box>
	);
}