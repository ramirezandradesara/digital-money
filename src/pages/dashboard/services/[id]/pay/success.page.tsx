import React from 'react';
import { useRouter } from 'next/router';
import { Container, useMediaQuery } from '@mui/material';
import { theme } from '@/styles/material-theme';
import SuccessfulPayment from '@/components/payServices/SuccessfulPayment';
import HomeLayout from '@/components/layouts/layout-home';

function Success() {
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

  const router = useRouter();

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

      <SuccessfulPayment />

    </Container>
  )
}

(Success as any).Layout = HomeLayout;

export default Success