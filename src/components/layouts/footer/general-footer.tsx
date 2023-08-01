import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { theme } from '@/styles/material-theme';


const GeneralFooter = () => { const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

return (
    <Box height='64px' pl='1rem' sx={{ 
        bgcolor: "primary.light", 
        zIndex: 100, 
        bottom: 0, 
        position: 'fixed', 
        width:'100%', 
        display: 'flex', 
        justifyContent: mobile ? 'center' : 'start', 
        alignItems: 'center'
        }}>
        <Typography variant={'body2'} color={'secondary'}> © 2023 Digital Money House</Typography>
    </Box>
);
};
export default GeneralFooter;