import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HomeLayout from '@/components/layouts/layout-home';
import AccountNumber from '@/components/payServices/AccountNumber';

import { DataUser } from '@/context/UserDataContext';
import { Container, useMediaQuery } from '@mui/material';
import { theme } from '@/styles/material-theme';

const ServiceById = () => {
  const { userData } = useContext(DataUser);
  const [token, setToken] = useState<string | null>('');
  const [service, setService] = useState<Service>();
  const router = useRouter();

  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

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
    const tokenStorage = localStorage.getItem('token');
    const id = window.location.pathname.split('/').pop();
    if (tokenStorage) {
      fetchServiceById(id);
    } else {
      router.push('/login');
    }
  }, [userData, token]);

  return (
    <Container
      sx={{
        backgroundColor: 'secondary.light',
        minWidth: '100%',
        minHeight: mobile || tablet ? '110vh' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingX: tablet || mobile ? 3 : 10,
        paddingY: mobile ? 4 : 6,
        gap: mobile ? 2 : 3,
      }}
    >
      <AccountNumber service={service} />
    </Container>
  );
};

(ServiceById as any).Layout = HomeLayout;

export default ServiceById;
