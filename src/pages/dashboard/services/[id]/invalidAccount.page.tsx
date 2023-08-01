import React from 'react';
import { useRouter } from 'next/router';
import PayServiceError from '@/components/payServices/PayServiceError';
import HomeLayout from '@/components/layouts/layout-home';
import { Container, useMediaQuery } from '@mui/material';
import { theme } from '@/styles/material-theme';

const InvalidAccount = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Container
    sx={{
      backgroundColor: "secondary.light",
      minWidth: "100%",
      minHeight: mobile || tablet ? "110vh" : "100vh",
      display: "flex",
      flexDirection: "column",
      paddingX: tablet || mobile ? 3 : 10,
      paddingY: mobile ? 4 : 6,
      gap: mobile ? 2 : 3,
    }}>
      <PayServiceError
        text='No encontramos facturas asociadas a este dato'
        description='Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura.'
        buttonText='Revisar dato'
        handleClick={handleClick}
      />
    </Container>
  );
};

(InvalidAccount as any).Layout = HomeLayout;

export default InvalidAccount;
