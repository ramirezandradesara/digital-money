import { Box, Container, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import HomeLayout from "@/components/layouts/layout-home";
import { theme } from "@/styles/material-theme";
import InfoPageText from "@/components/dashboard/infoPageText";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/router";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useEffect } from "react";

const Home: NextPage = () => {

  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));
  const desktop = useMediaQuery(theme.breakpoints.up('desktop'));

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login")
    }
  }, []);


  return (
    <>
      <Container
        sx={{
          // backgroundColor: "primary.main",
          // minWidth: "100%",
          minHeight: mobile || tablet ? '120vh' : '100vh',
          display: "flex",
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <Grid
          container
          spacing={4}
          direction="column"
          sx={{
            marginTop: 0,
            marginLeft: 0,
            backgroundColor: "secondary.light",
            paddingX: tablet || mobile ? 4 : 8,
            paddingY: mobile ? 4 : 10,
            gap: mobile ? 2 : 3,
          }}
        >
          {mobile && (<InfoPageText />)}

          <Box sx={{
            backgroundColor: 'primary.main',
            //minWidth: "100%",
            borderRadius: 3,
            position: "relative",
            padding: mobile ? '2rem 1rem' : '3rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
            onClick={() => { router.push('charge/externalAccount') }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton>
                <AccountCircleOutlinedIcon color='secondary' />
              </IconButton>
              <Typography color='secondary' variant={mobile ? "h4" : "h3"}>Transferencia bancaria</Typography>
            </Box>
            <IconButton>
              <ArrowForwardIcon color='secondary' />
            </IconButton>
          </Box>

          <Box sx={{
            backgroundColor: 'primary.main',
            //minWidth: "100%",
            borderRadius: 3,
            padding: mobile ? '2rem 1rem' : '3rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
            onClick={() => { router.push('charge/card') }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton>
                <CreditCardOutlinedIcon color='secondary' />
              </IconButton>
              <Typography color='secondary' variant={mobile ? "h4" : "h3"}>Seleccionar tarjeta</Typography>
            </Box>
            <IconButton>
              <ArrowForwardIcon color='secondary' />
            </IconButton>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

(Home as any).Layout = HomeLayout;

export default Home;
