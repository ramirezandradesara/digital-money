import { Box, Button, CircularProgress, Container, Divider, Grid, IconButton, List, ListItem, Radio, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, useContext, Fragment } from 'react'
import CircleIcon from "@mui/icons-material/Circle";
import { BankCard } from '@/types/bank_card.type';
import { DataUser } from '@/context/UserDataContext';
import getCards from '@/service/get_cards.service';
import { lastFourDigits } from '@/helpers/lastFourDigits';
import { checkExpDate } from '@/helpers/checkExpDate';
import useStep from '@/context/useStep';
import { theme } from '@/styles/material-theme';
import { useRouter } from 'next/router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoPageText from '../infoPageText';
import { AddMoneyContext, AddMoneyContextState } from '@/context/AddMoneyContext';
import creditCardType from "credit-card-type";


export const CardSelection = () => {

    const laptopOrDesktop = useMediaQuery(theme.breakpoints.up("laptop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
    const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

    let laptop;
    if (laptopOrDesktop && !desktop)
        laptop = true;

    const [cards, setCards] = useState<BankCard[]>([]);
    const { userData } = useContext(DataUser);
    const { deposit, setDeposit } = useContext(AddMoneyContext) as AddMoneyContextState;
    const { nextStep } = useStep();

    const [loading, setLoading] = useState<boolean>(false);

    const [selectedCardId, setSelectedCardId] = useState<string>('');

    useEffect(
        () => {
            if (deposit.card_number) {
                setSelectedCardId(deposit.card_number.toString())
            }
        },
        [deposit]
    )

    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCardId(event.target.value);
    };

    const handleClick = () => {
        setDeposit(prev => {
            return {
                ...prev,
                card_number: parseInt(selectedCardId),
                card_type: creditCardType(selectedCardId)[0]?.type || "Tarjeta sin tipo",
            }
        })
        nextStep();
    }

    const getCardsAsync = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No hay token");
            return;
        }
        if (!userData?.id) return;
        try {
            setLoading(true);
            const data: BankCard[] = await getCards(userData.id, token);
            const filteredCards: BankCard[] = data.filter((card: BankCard) => !checkExpDate(card.expiration_date))
            setCards(filteredCards);
        }
        catch (err) {
            //console.error(err);
        }
        setLoading(false);
    };

    const goToNewCard = () => {
        router.push('/dashboard/cards/add-card')
    }

    useEffect(() => {
        getCardsAsync();
    }, [userData]);

    return (
        <>
            <Container
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
                        paddingY: mobile ? 4 : 6,
                        gap: mobile ? 2 : 3,

                        "@media (max-width: 334px)": {
                            marginLeft: 'unset',
                            paddingLeft: 4,

                        },

                    }}
                >
                    {mobile && (<InfoPageText />)}

                    <Box
                        sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: 3,
                            padding: mobile ? '1.2rem 1.5rem 0rem' : '2.3rem 2.5rem',
                            cursor: 'pointer'

                        }}>

                        <Typography variant={mobile ? "h4" : "h3"} color='secondary' >Seleccionar tarjeta</Typography>
                        <Box sx={{
                            backgroundColor: "white",
                            width: '100%',
                            borderRadius: 3,
                            padding: '1rem 1rem 0rem',
                            marginTop: mobile ? '1rem' : '2rem',
                            cursor: 'pointer'

                        }}>
                            <Typography variant={'h4'}>Tus tarjetas</Typography>

                            {loading &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        flexWrap: 'wrap',

                                    }}
                                >
                                    <CircularProgress></CircularProgress>
                                </Box>
                            }
                            {
                                cards && !loading &&
                                (cards?.length <= 0 ? (
                                    <Typography
                                        variant={"h4"}
                                        sx={{ color: "#888a88", marginTop: "30px", textAlign: "center" }}
                                    >
                                        No tenés tarjetas asociadas
                                    </Typography>
                                ) : (
                                    <List>
                                        {cards?.length > 0
                                            ? cards?.map((card: BankCard) => (
                                                <Fragment key={card.id}>
                                                    <ListItem
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            paddingY: tablet || mobile ? "10px" : "15px",
                                                            paddingX: { mobile: 0 },
                                                        }}

                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <CircleIcon
                                                                sx={{ color: "secondary.main", fontSize: "30px" }}
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    fontSize: { sm: "16px", tablet: "16px" },
                                                                    marginLeft: "16px",
                                                                }}
                                                            >
                                                                Terminada en {lastFourDigits(card?.number_id)}
                                                            </Typography>
                                                        </Box>
                                                        <Radio

                                                            checked={selectedCardId === card?.number_id.toString()}
                                                            onChange={handleChange}
                                                            value={card?.number_id}
                                                            name="radio-buttons"
                                                            sx={{
                                                                color: "#00000080",
                                                                '&.Mui-checked': {
                                                                    color: "#000000",//"secondary.main",   
                                                                    // backgroundColor: "secondary.main",                                                               
                                                                },
                                                            }}
                                                        />
                                                    </ListItem>
                                                    <Divider sx={{ border: "1px solid #0000002c" }} />
                                                </Fragment>
                                            ))
                                            : null}
                                    </List>
                                ))
                            }
                        </Box >

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: tablet ? 'flex-start' : 'center',
                            m: '0.75rem 0 0.75rem',
                            flexDirection: tablet ? 'column' : 'row',

                        }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }} onClick={goToNewCard} >
                                <IconButton sx={{ marginTop: mobile ? "4px" : "5px", }}>
                                    <AddCircleOutlineIcon color='secondary' fontSize={mobile ? 'medium' : 'large'} />
                                </IconButton>
                                <Typography color='secondary.main' variant={'subtitle2'} sx={{ marginTop: mobile ? "4px" : "7px", fontSize: mobile ? '16px' : '20px' }}>Nueva tarjeta</Typography>
                            </Box>

                            {!mobile &&
                                <Button variant="contained" disabled={!selectedCardId} onClick={() => handleClick()}
                                    sx={{
                                        marginTop: "20px",
                                        backgroundColor: "secondary.main",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 17,
                                        width: laptopOrDesktop ? '25%' : '100%',
                                        paddingY: 1,
                                        height: "50px",
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
                            }
                        </Box>
                    </Box>

                    {mobile &&
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'end',
                                alignItems: 'center'
                            }}>
                            <Button variant="contained" disabled={!selectedCardId} onClick={() => handleClick()}
                                sx={{
                                    marginTop: "10px",
                                    backgroundColor: "secondary.main",
                                    borderRadius: 2,
                                    color: "black",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    fontSize: 16,
                                    paddingX: 7,
                                    paddingY: 1,
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
                        </Box>
                    }                </Grid>
            </Container>
        </>
    )
}



