import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import PersonalData from '@/components/profile/PersonalData';
import ManagePaymentButton from '@/components/profile/ManagePaymentButton';
import AccountData from '@/components/profile/AccountData';
import HomeLayout from '@/components/layouts/layout-home';
import Loader from '@/components/utils/Loader';
import { DataUser } from '../../context/UserDataContext.jsx';
import { useContext, useEffect } from 'react';
import { theme } from '@/styles/material-theme';
import InfoPageText from '@/components/dashboard/infoPageText';
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const router = useRouter();
  const { userData , token} = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const desktop = useMediaQuery(theme.breakpoints.up('desktop'));

  useEffect(() => {
    let myToken = localStorage.getItem("token")
    if(!myToken){
      router.push("/login")
    }
  }, []);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <Grid
          container
          spacing={4}
          direction='column'
          sx={{
            marginTop: 0,
            marginLeft: 0,
            backgroundColor: 'secondary.light',
            minHeight: mobile || tablet ? '120vh' : '100vh',
            width: '100%',
            paddingX: desktop || tablet ? 0 : 10,
            paddingTop: 6,
            paddingBottom: 12,
            gap: 3,
          }}
        >
          {userData ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: mobile ? 2 : 5,
                width: mobile ? 'auto' : desktop ? '90%' : '80%',
                marginLeft: mobile ? '-60px' : '70px',
              }}
            >
              {mobile && <InfoPageText />}
              <PersonalData />
              <ManagePaymentButton />
              <AccountData isEditable/>
            </Box>
          ) : (
            <Box sx={{ marginTop: '-150px' }}>
              <Loader color='primary.main' />
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

(Profile as any).Layout = HomeLayout;

export default Profile;
