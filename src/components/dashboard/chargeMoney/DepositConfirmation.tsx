import { Box, Button, Grid, Typography, useMediaQuery, Container } from "@mui/material";
import { theme } from '@/styles/material-theme';
import InfoPageText from "../infoPageText";
import { useContext } from "react";
import { AddMoneyContext, AddMoneyContextState } from '@/context/AddMoneyContext';
import { lastFourDigits } from "@/helpers/lastFourDigits";
import { useRouter } from "next/router";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import getFormattedDate from "@/components/utils/getFormattedDate";
import ReactDOMServer from 'react-dom/server';
import TransactionOk from "./TransactionOk";
import convertHtmlToPDF from "../../../helpers/htmlToPdf";

const DepositConfirmation = () => {

    const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
    const laptop = useMediaQuery(theme.breakpoints.between('laptop', "desktop"));
    const desktop = useMediaQuery(theme.breakpoints.up('desktop'));

    const { deposit } = useContext(AddMoneyContext) as AddMoneyContextState;

    const router = useRouter();

    const downloadPdf = async () => {
        // --> ReactDOMServer.renderToStaticMarkup: funcion que retorna el html en formato de string
        await convertHtmlToPDF(ReactDOMServer.renderToStaticMarkup(<TransactionOk deposit={deposit}/>));
    }

    return (
        <>
            <Container
                sx={{
                    backgroundColor: "primary.main",
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
                        paddingX: tablet || mobile ? 3 : 7,
                        paddingY: mobile ? 4 : 6,
                        gap: mobile ? 2 : 3,
                    }}
                >
                    {mobile && (<InfoPageText />)}
                    <Grid
                        item
                        sx={{
                            backgroundColor: "secondary.main",
                            borderRadius: 3,
                            position: "relative",
                            minWidth: "100%",
                            height: "145px",
                            paddingLeft: "0 !important",
                            paddingTop: "0 !important",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            paddingY: 5,
                            paddingX: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: 'center',
                                flexDirection: "column",
                                alignItems: "center"
                            }}>
                            <CheckCircleOutlineIcon
                                sx={{
                                    fontSize: "55px",
                                }}
                            />
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontSize: mobile ? "16px" : "24px !important",
                                    fontWeight: "bold",
                                }}>
                                Ya cargamos el dinero en tu cuenta
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            backgroundColor: "primary.main",
                            borderRadius: 3,
                            position: "relative",
                            minWidth: "100%",
                            height: desktop ? 300 : 280,
                            paddingLeft: "0 !important",
                            paddingTop: "0 !important",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            paddingY: 5,
                            paddingX: 4,
                        }}
                    >
                        <Box sx={{ display: "flex", gap: '0', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: desktop ? "22px" : "14px",
                                    marginTop: "10px",
                                    marginLeft: mobile ? "" : "25px"
                                }}>
                                Fecha: {getFormattedDate(deposit.dated)}
                            </Typography>
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'secondary.main',
                                width: '100%',
                                fontSize: desktop ? "22px" : "16px",
                                marginTop: "10px",
                                marginLeft: mobile ? "" : "25px"
                            }}>
                            ${deposit.amount}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: desktop ? "16px" : "12px !important",
                                marginTop: "23px",
                                marginLeft: mobile ? "" : "25px"
                            }}>
                            Para
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'secondary.main',
                                width: '100%',
                                fontSize: desktop ? "25px" : "20px",
                                marginLeft: mobile ? "" : "25px"
                            }}>
                            Cuenta propia
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: 16,
                                marginTop: "23px",
                                marginLeft: mobile ? "" : "25px"
                            }}>
                            {deposit.card_type}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: desktop ? "14px" : "14px !important",
                                marginLeft: mobile ? "" : "25px"
                            }}>
                            Terminada en {lastFourDigits(deposit.card_number)}
                        </Typography>
                    </Grid>
                    <Grid container
                        gap={2}
                        sx={{
                            display: "flex",
                            flexDirection: mobile ? "column" : "row",
                            justifyContent: laptop || desktop ? "end" : tablet ? "center" : "",
                            "& :nth-of-type(1)": {
                                "order": mobile ? 1 : 2
                            },
                            "& :nth-of-type(2)": {
                                "order": mobile ? 2 : 1
                            }
                        }}
                    >
                        <Grid item tablet={6} laptop={4}>
                            <Button
                                variant="contained"
                                onClick={() => { downloadPdf() }}
                                sx={{
                                    backgroundColor: "secondary.main",
                                    borderRadius: 2,
                                    color: "black",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    fontSize: 14,
                                    height: "50px",
                                    width: "100%",
                                    "&:hover": {
                                        transitionDelay: "0.05s",
                                        backgroundColor: "#dbfc90",
                                        boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                      },
                                }}
                            >
                                Descargar comprobante
                            </Button>
                        </Grid>
                        <Grid item tablet={5} laptop={3}>
                            <Button
                                variant="contained"
                                onClick={() => { router.push('/dashboard') }}
                                sx={{
                                    backgroundColor: "#CECECE",
                                    borderRadius: 2,
                                    color: "black",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    fontSize: 14,
                                    height: "50px",
                                    width: "100%",
                                    "&:hover": {
                                        transitionDelay: "0.05s",
                                        backgroundColor: "#c7c9c5",
                                        boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                      },
                                }}
                            >
                                Ir al inicio
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default DepositConfirmation;