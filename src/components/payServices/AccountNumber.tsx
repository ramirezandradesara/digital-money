import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
} from '@mui/material';
import Loader from '../utils/Loader';
import { useRouter } from 'next/router';
import { theme } from '@/styles/material-theme';
import InfoPageText from '../dashboard/infoPageText';

const AccountNumber: React.FC<{ service?: Service }> = ({ service }) => {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState('');

  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericInput = event.target.value.replace(/\D/g, '');
    setAccountNumber(numericInput);
  };

  const handleClick = (number: string) => {
    let accountValidity;
    if (number.endsWith('00')) {
      accountValidity = 'invalid';
    } else {
      accountValidity = 'valid';
    }

    if (accountValidity === 'invalid') {
      const invalidAccountUrl = `/dashboard/services/${service?.id}/invalidAccount`;
      router.push(invalidAccountUrl);
    } else {
      const pay = `/dashboard/services/${service?.id}/pay`;
      router.push(pay);
    }
  };

  if (!service) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <>
      {mobile && <InfoPageText pageText='Pagar servicios' />}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          padding: mobile || tablet ? '20px 30px' : '40px 50px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography
            sx={{
              color: 'secondary.main',
              marginRight: '8px',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            Número de cuenta de {service?.name}
          </Typography>
          <TextField
            type='text'
            size='medium'
            sx={{
              margin: '20px 0 5px 0',
              width: mobile || tablet ? '100%' : '70%',
              background: 'white',
              borderRadius: '10px',
            }}
            onChange={handleChange}
            value={accountNumber}
            inputProps={{
              pattern: '[0-9]*',
              inputMode: 'numeric',
              minLength: 5,
              maxLength: 10,
            }}
          />

          <Typography
            variant='body2'
            style={{ fontSize: 'small', color: 'white' }}
          >
            Ingrese su número de cuenta
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
              paddingY: '15px',
              paddingX: '50px',
              marginTop: mobile || tablet ? '20px' : 'auto',
              width: mobile || tablet ? '100%' : 'auto',
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
              '&:disabled': {
                backgroundColor: '#999',
                color: '#2A292C',
              },
            }}
            variant='contained'
            onClick={() => handleClick(accountNumber)}
            disabled={
              accountNumber == '' ||
              accountNumber.length < 5
            }
          >
            Continuar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AccountNumber;
