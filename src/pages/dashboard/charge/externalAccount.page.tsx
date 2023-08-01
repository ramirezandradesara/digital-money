import HomeLayout from '@/components/layouts/layout-home';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { NextPage } from 'next'
import Head from 'next/head';
import React, { useEffect } from 'react'
import { theme } from '@/styles/material-theme';
import AccountData from '@/components/profile/AccountData';
import InfoPageText from '@/components/dashboard/infoPageText';
import { useRouter } from 'next/router';

export const ExternalAccount: NextPage = () => {

    let router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login")
        }
      }, []);
    

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;
    return (
        <>
            <Head>
                <title>Add money</title>
                <meta name="description" content="Digital Money House" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Container
             role="container"
                sx={{
                    //backgroundColor: "primary.main",
                    minWidth: "100%",
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
                    <AccountData />
                </Grid>
            </Container>
        </>
    )
}
(ExternalAccount as any).Layout = HomeLayout;

export default ExternalAccount;
