import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { theme } from '@/styles/material-theme';
import { useRouter } from 'next/router';
import { DataUser } from '@/context/UserDataContext';
import InfoPageText from '../dashboard/infoPageText';

const SuccessfulPayment = () => {
  const { userData } = useContext(DataUser);
  const [token, setToken] = useState<string | null>('');
  const [service, setService] = useState<Service>();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<string | null>('');

  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

  const handleClick = () => {
    router.push('/dashboard');
  };

  const printCurrentDateTime = (): any => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString(
      'es-ES',
      options
    );
    return formattedDate;
  };

  const fetchServiceById = async (id: string | undefined) => {
    if (token) {
      try {
        const response = await fetch(
          `https://digitalmoney.ctd.academy/service/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setService(data);
        } else {
          console.error('Error fetching service:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setPaymentData(localStorage.getItem('DMH-paymentData'));
    const tokenStorage = localStorage.getItem('token');
    const url = window.location.pathname;
    const segments = url.split('/');
    const id = segments[3];
    if (tokenStorage) {
      fetchServiceById(id);
    } else {
      router.push('/login');
    }
  }, [userData, token]);

  return (
    <>
    {mobile && <InfoPageText pageText='Pagar servicios' />}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0 10px 0 ',
        }}
      >
        <CheckIcon
          sx={{
            color: 'black',
            fontSize: '85px',
            padding: '10px',
            border: '5px solid black',
            borderRadius: '100%',
          }}
        />
        <Typography
          sx={{
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px',
          }}
        >
          Ya realizaste tu pago
        </Typography>
      </Box>

      <Box sx={{ display: 'block' }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            padding: mobile || tablet ? '50px 30px' : '50px',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'light',
              fontSize: '16px',
            }}
          >
            {printCurrentDateTime()}
          </Typography>
          <Typography
            sx={{
              color: 'secondary.main',
              fontWeight: 'bold',
              fontSize: '24px',
              marginTop: '5px',
            }}
          >
            ${service?.invoice_value}
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'light',
              fontSize: '16px',
              marginTop: '25px',
            }}
          >
            Para
          </Typography>
          <Typography
            sx={{
              color: 'secondary.main',
              fontWeight: 'bold',
              fontSize: '24px',
              marginTop: '5px',
            }}
          >
            {service?.name}
          </Typography>
          {paymentData ? (
            <>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  marginTop: '25px',
                }}
              >
                Tarjeta
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginTop: '5px',
                }}
              >
                Visa ******{localStorage.getItem('DMH-paymentData')?.slice(-4)}
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                marginTop: '25px',
              }}
            >
              Pagado con dinero de tu cuenta
            </Typography>
          )}
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
              paddingY: '10px',
              paddingX: '50px',
              marginTop: '20px',
              width: mobile || tablet ? '100%' : 'auto',
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
            }}
            variant='contained'
            onClick={() => handleClick()}
          >
            Ir al inicio
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default SuccessfulPayment;
