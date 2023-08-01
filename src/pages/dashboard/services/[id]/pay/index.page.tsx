import HomeLayout from '@/components/layouts/layout-home';
import {
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    Radio,
    Typography,
    useMediaQuery,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import React, { useContext, useEffect, useState, Fragment } from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { BankCard } from '@/types/bank_card.type';
import { DataUser } from '@/context/UserDataContext';
import getCards from '@/service/get_cards.service';
import { useRouter } from 'next/router';
import { lastFourDigits } from '@/helpers/lastFourDigits';
import { theme } from '@/styles/material-theme';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { checkExpDate } from '@/helpers/checkExpDate';
import DetailsModal from './detailsModal';

function SelectMethod() {
    const laptop = useMediaQuery(theme.breakpoints.up('laptop'));
    const desktop = useMediaQuery(theme.breakpoints.up('desktop'));
    const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

    const [modal, setModal] = useState<boolean>(false);
    const [cards, setCards] = useState<BankCard[]>([]);
    const [token, setToken] = useState<string | null>('');
    const [service, setService] = useState<Service>();
    const [selectedCardId, setSelectedCardId] = useState<string>('');
    const [moneyInAccount, setMoneyInAccount] = useState<string>('');
    const { userData } = useContext(DataUser);
    let router = useRouter();

    const getCardsAsync = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No hay token');
            return;
        }
        if (!userData?.id) return;

        try {
            const data = await getCards(userData?.id, token);
            setCards(data);
        } catch (err) {
            //  console.error(err);
        }
    };

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoneyInAccount('');
        setSelectedCardId(event.target.value);
    };

    const handleChangeMoneyAccount = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedCardId('');
        setMoneyInAccount(event.target.value);
    };

    const payService = () => {
        localStorage.removeItem('DMH-paymentData');
        if (!selectedCardId && moneyInAccount) {
            if (
                service?.invoice_value !== undefined &&
                userData?.available_amount > service?.invoice_value
            ) {
                localStorage.removeItem('DMH-paymentData');
                return router.push(`/dashboard/services/${service?.id}/pay/success`);
            }
        }

        if (selectedCardId && !moneyInAccount) {
            const cardSelected = cards.filter(
                (c) => c.number_id === parseInt(selectedCardId)
            );
            if (!checkExpDate(cardSelected[0]?.expiration_date)) {
                localStorage.setItem(
                    'DMH-paymentData',
                    cardSelected[0].number_id.toString()
                );
                return router.push(`/dashboard/services/${service?.id}/pay/success`);
            }
        }

        return router.push(`/dashboard/services/${service?.id}/pay/error`);
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        const tokenStorage = localStorage.getItem('token');
        // const id = window.location.pathname.split('/').pop();
        const url = window.location.pathname;
        const segments = url.split('/');
        const id = segments[3];
        if (tokenStorage) {
            getCardsAsync();
            fetchServiceById(id);
        } else {
            router.push('/login');
        }
    }, [userData, token]);

    return (
        <Grid
            container
            direction="column"
            sx={{
                marginTop: 0,
                marginLeft: 0,
                backgroundColor: "secondary.light",
                paddingX: { mobile: 3, tablet: 6, laptop: 9, desktop: 8 },
                paddingY: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 },
                gap: { mobile: 2, tablet: 3 },
                minHeight: { mobile: "120vh", tablet: "100vh", laptop: "105vh" },
            }}
        >
            {modal && <DetailsModal service={service} setModal={setModal} />}
            <Box
                sx={{
                    display: { mobile: "flex", tablet: "none" },
                    alignItems: "center",
                }}
            >
                <ArrowForwardRoundedIcon
                    sx={{ fontSize: "25px", color: "#0000008c" }}
                />
                <Typography variant={"h4"} sx={{ marginLeft: "10px" }}>
                    Pagar servicios
                </Typography>
            </Box>
            {/* SERVICE DETAILS SECTION */}
            <Grid
                sx={{
                    backgroundColor: "primary.main",
                    borderRadius: 1,
                    padding: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 },
                }}
            >
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant={"h3"}
                        sx={{ color: "secondary.main" }}
                    >
                        {service?.name}
                    </Typography>
                    <Typography
                        sx={{
                            cursor: 'pointer',
                            color: "secondary.light", fontSize: { sm: "13px", tablet: "16px" },
                        }}
                        onClick={() => setModal(true)}
                    >
                        Ver detalles del pago
                    </Typography>
                </Grid>
                <Divider sx={{ border: "1px solid #3A393E", marginY: '15px' }} />
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant={"h3"}
                        sx={{ color: "secondary.light" }}
                    >
                        Total a pagar
                    </Typography>
                    <Typography
                        variant={"h3"}
                        sx={{ color: "secondary.light" }}
                    >
                        ${service?.invoice_value}
                    </Typography>
                </Grid>

            </Grid>
            {/* DINERO EN CUENTA */}
            <Grid
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 1,
                    padding: { mobile: 3, tablet: 5, laptop: 4, desktop: 4 },
                }}
            >
                <Typography
                    variant={"h4"}
                    sx={{ color: "primary.main", marginBottom: "25px" }}
                >
                    Dinero en cuenta
                </Typography>
                <Box
                    sx={{
                        display: { mobile: "flex" },
                        alignItems: "center",
                        marginBottom: "20px", //
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant={"h3"}
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                    >
                        ${(userData?.available_amount).toFixed(2)}
                    </Typography>
                    <Radio
                        checked={moneyInAccount === userData?.available_amount?.toString()}
                        onChange={handleChangeMoneyAccount}
                        value={userData?.available_amount}
                        name="radio-buttons"
                        sx={{
                            color: "primary.main",
                            '&.Mui-checked': {
                                color: "primary.main"
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: { mobile: "flex" },
                        alignItems: "center",
                    }}
                >
                    <InfoRoundedIcon
                        sx={{ fontSize: "25px", color: "#0000008c" }}
                    />
                    <Typography
                        sx={{
                            marginLeft: "10px",
                            fontSize: { sm: "16px", tablet: "16px" },
                        }}
                    >
                        En tu cuenta quedarán ${(userData?.available_amount - (service ? service.invoice_value : 0)).toFixed(2)}
                        {(userData?.available_amount < (service ? service.invoice_value : 0)) && ". Saldo insuficiente para realizar el pago."}
                    </Typography>
                </Box>
            </Grid>
            {/* CARDS SECTION */}
            <Grid
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 1,
                    padding: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 },
                }}
            >
                <Typography
                    variant={"h4"}
                    sx={{ color: "primary.main", marginBottom: "10px" }}
                >
                    Tus tarjetas
                </Typography>
                {cards &&
                    (cards?.length <= 0 ? (
                        <Typography
                            variant={"h4"}
                            sx={{ color: "#8a8888", marginTop: "30px", textAlign: "center" }}
                        >
                            No tenés tarjetas asociadas
                        </Typography>
                    ) : (
                        <List>
                            {cards?.map(card => (
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
                                            <CircleIcon sx={{ color: "secondary.main", fontSize: "30px" }} />
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
                                                color: "primary.main",
                                                '&.Mui-checked': {
                                                    color: "primary.main"
                                                },
                                            }}
                                        />
                                    </ListItem>
                                    <Divider sx={{ border: "1px solid #0000002c" }} />
                                </Fragment>
                            ))}
                        </List>
                    ))}
            </Grid>
            {/* BOTONES */}
            <Grid container
                data-testid="buttons-container"
                gap={2}
                sx={{
                    display: "flex",
                    // marginBottom: "30px",
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
                <Grid item tablet={5} laptop={3} sx={{ marginBottom: { mobile: '0px', tablet: "40px" } }} >
                    <Button
                        variant="contained"
                        onClick={() => payService()}
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
                        Pagar
                    </Button>
                </Grid>
                <Grid item tablet={5} laptop={3}>
                    <Button
                        variant="contained"
                        onClick={() => { router.push('/dashboard/cards/add-card') }}
                        sx={{
                            marginBottom: { mobile: '60px', tablet: "40px" },
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
                        Agregar nueva tarjeta
                    </Button>
                </Grid>
            </Grid>
        </Grid >
    );
}

(SelectMethod as any).Layout = HomeLayout;

export default SelectMethod;
