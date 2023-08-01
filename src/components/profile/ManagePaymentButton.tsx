import { Button, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { theme } from '@/styles/material-theme';

const ManagePaymentButton: FC = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Button
      variant='contained'
      endIcon={
        <ArrowForwardIcon
          style={{ fontSize: '2rem', marginRight: mobile ? '20px' : '40px' }}
        />
      }
      sx={{
        width: '100%',
        height: mobile ? '70px' : '100px',
        padding: 0,
        borderRadius: 2,
        backgroundColor: 'secondary.main',
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: mobile ? 16 : 20,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        transitionDelay: '0.05s',
        '&:hover': {
          color: '#FFFFFF !important',
          transitionDelay: '0.05s',
        },
      }}
    >

      <NextLink href={`/dashboard/cards`} passHref>
        <MUILink
          variant='button'
          underline='none'
          sx={{
            width: '100%',
            height: '100%',
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: mobile? 15:20,
            display: 'flex',
            alignItems: 'center',
            paddingX: mobile ? '20px' : '40px',
            justifyContent: 'space-between',
            transitionDelay: '0.05s',
            '&:hover': {
              color: '#FFFFFF !important',
              transitionDelay: '0.05s',
            },
          }}
        >
          Gestioná los medios de pago
        </MUILink>
      </NextLink>
    </Button>
  );
};

export default ManagePaymentButton;
