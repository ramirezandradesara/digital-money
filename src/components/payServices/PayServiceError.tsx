import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '@/styles/material-theme';
import InfoPageText from '../dashboard/infoPageText';

interface PayServiceErrorProps {
  text: string;
  description: string;
  buttonText: string;
  handleClick: () => void;
}

const PayServiceError: React.FC<PayServiceErrorProps> = ({
  text,
  description,
  buttonText,
  handleClick,
}) => {
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

  return (
    <>
      {mobile && <InfoPageText pageText='Pagar servicios' />}
      <Box sx={{ display: 'block' }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            padding: '40px 50px',
            height: '300px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CloseIcon
            sx={{
              color: 'red',
              fontSize: '85px',
              padding: '10px',
              border: '5px solid red',
              borderRadius: '100%',
            }}
          />
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '10px',
              borderBottom: '1px solid #303030',
            }}
          >
            {text}
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'light',
              fontSize: '14px',
              width: mobile || tablet ? '100%' : '40%',
              alignSelf: 'center',
              textAlign: 'center',
              padding: '10px',
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            sx={{
              backgroundColor: 'secondary.main',
              color: 'black',
              borderRadius: '4px',
              textTransform: 'capitalize',
              paddingY: '10px',
              paddingX: '50px',
              marginTop: '20px',
              width: mobile || tablet ? '100%' : 'auto',
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
            }}
            variant='contained'
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PayServiceError;
