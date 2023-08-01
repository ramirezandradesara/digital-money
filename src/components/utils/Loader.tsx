import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface LoaderProps {
  color?: string;
  height?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = 'secondary.main', height= '100vh' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
      }}
      data-testid="loader"
    >
      <CircularProgress sx={{ color: color }} />
    </Box>
  );
};

export default Loader;
