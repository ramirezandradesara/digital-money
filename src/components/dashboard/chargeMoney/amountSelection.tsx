import { theme } from '@/styles/material-theme';
import { Box, Button, Container, Grid, Input, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import useStep from '@/context/useStep';
import { AddMoneyContext, AddMoneyContextState } from '@/context/AddMoneyContext';
import InfoPageText from '../infoPageText';
import * as yup from 'yup';

const amountSchema = yup
    .number()
    .required('El número es requerido.')
    .positive('El número debe ser mayor que cero.')
    .typeError('Ingrese un número válido.')

export const AmountSelection = () => {

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const [amount, setAmount] = useState<string>("");
    const [backButtonClicked, setBackButtonClicked] = useState(false);
    const { nextStep, previousStep } = useStep();
    const { deposit, setDeposit } = useContext(AddMoneyContext) as AddMoneyContextState;

    const [error, setError] = useState<string>('');

    useEffect(
        () => {
            if (deposit.amount) {
                setAmount(deposit.amount.toString());
            }
        }, [deposit]
    )

    const validateAmount = (amount: string) => {
        const parsedAmount = parseFloat(amount)
        if (parsedAmount <= 0 || isNaN(parsedAmount))

            return false;

        return true;
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const current_value: string = e.target.value;
        setAmount(current_value);
        try {

            await amountSchema.validate(current_value);
            setError("")
        }
        catch (err: any) {
            setError(err.message);
        }
    }

    const handleClick = () => {
        setDeposit(prev => {
            return {
                ...prev,
                amount: parseFloat(amount)
            }
        })
        nextStep();
    }

    const handleButtonClick = () => {
        setBackButtonClicked(true);
        setTimeout(() => {
            previousStep();
        }, 150);
    }

    return (
        <>
            <Container
                sx={{
                    // backgroundColor: "primary.main",
                    //minWidth: "100%",
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
                        paddingX: tablet || mobile ? 3 : 8,
                        paddingY: mobile ? 4 : 6,
                        gap: mobile ? 2 : 3,
                    }}
                >
                    {mobile && (<InfoPageText />)}

                    <Box sx={{
                        backgroundColor: 'primary.main',
                        //width: '90%',
                        borderRadius: 3,
                        padding: mobile ? '2rem 1.5rem 2rem' : '2rem 2.5rem 1.5rem',
                        cursor: 'pointer'
                    }}>
                        <Typography variant={mobile ? "subtitle2" : "h3"} color='secondary' sx={{
                            paddingRight: tablet ? '5rem ' : '3rem',
                        }}>¿Cuánto querés ingresar a la cuenta?</Typography>

                        <Box sx={{
                            backgroundColor: 'white',
                            width: laptopOrDesktop ? '46%' : '100%',
                            borderRadius: '10px',
                            padding: tablet ? '0.7rem' : '0.6rem 1rem',
                            marginTop: '1.5rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography marginRight={'2px'}>$</Typography>
                            <Input
                                type='number'
                                size='medium'
                                sx={{
                                    padding: '0', margin: '0', fontSize: mobile ? '10pt' : '13pt', height: '100%', width: '100%',
                                }}
                                onChange={handleChange}
                                value={amount}
                                onKeyDown={(event) => {
                                    if (event?.key === '-' || event?.key === '+' || event?.key === 'e') {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Box>

                        {!mobile &&
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                m: '0.75rem 0 0.75rem',
                                flexDirection: tablet ? "column-reverse" : "unset"
                            }}
                            >
                                <Button
                                    variant="contained"
                                    // onClick={() => { router.reload() }}
                                    onClick={() => { previousStep() }}

                                    sx={{
                                        //alignItems: "initial",
                                        marginTop: "15px",
                                        backgroundColor: "grey", //"#CECECE"
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 17,
                                        padding: tablet ? '1rem' : '0.65rem',
                                        width: laptopOrDesktop ? '15%' : '100%',
                                        height: "50px",
                                        marginRight: "15px",
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#c7c9c5",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                          },
                                    }}
                                >
                                    Atrás
                                </Button>

                                <Button color="secondary" disabled={!validateAmount(amount)} variant="contained" onClick={() => handleClick()}
                                    sx={{
                                        marginTop: "15px",
                                        height: "50px",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 17,
                                        padding: tablet ? '1rem' : '0.65rem',
                                        width: laptopOrDesktop ? '25%' : '100%',
                                        "&:disabled": {
                                            backgroundColor: "#CECECE",
                                            color: "#2A292C",
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#dbfc90",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                          },
                                    }}>
                                    Continuar
                                </Button>
                            </Box>
                        }

                    </Box>
                    {mobile &&
                        <Box
                            sx={{
                                display: 'flex',
                                //width: '100%', 
                                alignItems: 'end',
                                flexDirection: "column",
                            }}>
                            <Grid item>
                                <Button color="secondary" variant="contained" disabled={!validateAmount(amount)} onClick={() => handleClick()}
                                    sx={{
                                        marginTop: "8px",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 6,
                                        paddingY: 1,
                                        width: '100%',
                                        height: "50px",

                                        "&:disabled": {
                                            backgroundColor: "#CECECE",
                                            color: "#2A292C",
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#dbfc90",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                          },
                                    }}>
                                    Continuar
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    //onClick={() => { router.reload() }}
                                    //onClick={() => { previousStep() }}
                                    onClick={handleButtonClick}
                                    sx={{
                                        marginTop: "15px",
                                        //backgroundColor: backButtonClicked ? "gray" : "#CECECE",
                                        backgroundColor: "gray",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
                                        width: '100%',
                                        height: "50px",
                                        '&:focus': {
                                            backgroundColor: "#3A393E",
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#c7c9c5",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                          },
                                    }}
                                >
                                    Atrás
                                </Button>
                            </Grid>
                        </Box>
                    }

                    {error &&
                        <Typography data-testid="amount-error"
                            variant="h3"
                            sx={{
                                color: "error.main",
                                fontSize: "16px",
                                fontWeight: "bold",
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {error}
                        </Typography>}
                </Grid>
            </Container>
        </>
    )
}

