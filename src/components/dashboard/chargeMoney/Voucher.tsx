import { Box, Button, Grid, Typography, useMediaQuery, IconButton, TextField, Container } from "@mui/material";
import { theme } from '@/styles/material-theme';
import useStep from "@/context/useStep";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { ChangeEvent, FC, useEffect, useState } from "react";
import * as yup from 'yup';
import Done from "@mui/icons-material/Done";
import { useContext } from "react";
import InfoPageText from "../infoPageText";
import { AddMoneyContext, AddMoneyContextState } from '@/context/AddMoneyContext';
import { lastFourDigits } from "@/helpers/lastFourDigits";
import { useRouter } from "next/router";
import { postDeposit } from "@/service/post_deposit.service";
import { DataUser } from "@/context/UserDataContext";
import { Deposit } from "@/types/deposit.type";
import { boxShadow } from "html2canvas/dist/types/css/property-descriptors/box-shadow";

const amountSchema = yup
    .string()
    .matches(/^[1-9][0-9]*/, `El formato del importe es invalido.\nDebe contener solamente números.\nDebe contener al menos un número.\nEl número no puede empezar con 0.`)
    .required();

const Voucher: FC = () => {

    const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
    const laptop = useMediaQuery(theme.breakpoints.between('laptop', "desktop"));
    const desktop = useMediaQuery(theme.breakpoints.up('desktop'));

    const { deposit, setDeposit } = useContext(AddMoneyContext) as AddMoneyContextState;

    const { nextStep, previousStep } = useStep();

    const [amount, setAmount] = useState("");
    const [isSettingAmount, setIsSetteingAmount] = useState(false);
    const [error, setError] = useState("");
    const { userData } = useContext(DataUser);
    const [loading, setLoading] = useState<boolean>(false);

    let router = useRouter();

    useEffect(() => {
        let myToken = localStorage.getItem("token")
        if (!myToken) {
            router.push("/login")
        }

        setAmount(`${deposit.amount}`)
    }, [])

    // Solicitud de depósito a la API:

    const postDepositAsync = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No hay token");
            router.push("/login")
            return;
        }
        if (!userData?.id) return;
        if (!userData?.cvu) return;

        //console.log("POST DEPOSIT!");

        const depositData: Deposit = {
            amount: deposit.amount,
            dated: new Date(),
            destination: userData.cvu,
            origin: deposit.card_number.toString()
        }
        try {
            setLoading(true);

            const response = await postDeposit(token, userData.id, depositData);
            // console.log(response);            

            setDeposit(
                prev => {
                    return {
                        ...prev,
                        dated: response.dated
                    }
                }
            )

        }
        catch (err) {
            //   console.error(err)
        }
        setLoading(false);
    }

    const handleClick = async () => {
        await postDepositAsync()
        nextStep();
    }


    const validationInput = async (element: String): Promise<boolean> => {
        try {
            await amountSchema.validate(element);
            setError("")
            return true;
        } catch (error: any) {
            console.log("Error", error);
            setError(error.message)
            return false;
        }
    }

    const changeAmount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log(e.target.value);
        setError("")
        setAmount(e.target.value)
        setDeposit(prev => {
            return {
                ...prev,
                amount: parseFloat(e.target.value)
            }
        })
    }

    const doneChangeAmount = async () => {
        const validation = await validationInput(amount)
        if (!validation) {
            return;
        }
        setError("");
        setIsSetteingAmount(false);
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
                        paddingX: tablet || mobile ? 3 : 10,
                        paddingY: mobile ? 4 : 6,
                        gap: mobile ? 2 : 3,
                    }}
                >
                    {mobile && (<InfoPageText />)}
                    <Grid
                        item
                        sx={{
                            backgroundColor: "primary.main",
                            borderRadius: 3,
                            position: "relative",
                            minWidth: "100%",
                            height: mobile ? 340 : tablet ? 455 : laptop ? 380 : 400,
                            paddingLeft: "0 !important",
                            paddingTop: "0 !important",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            paddingY: 5,
                            paddingX: 4,
                        }}
                    >
                        <Typography
                            variant={mobile ? "h5" : "h2"}
                            sx={{
                                color: "secondary.main",
                                fontSize: desktop ? "32px" : "20px",
                                marginBottom: "10px",
                                marginLeft: tablet ? "25px" : ""
                            }}>
                            Revisá que está todo bien
                        </Typography>
                        {mobile && <hr style={{ width: "100%" }} />}
                        <Box sx={{ display: "flex", gap: '0', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    color: 'white',
                                    // width: '100%',
                                    fontSize: desktop ? "22px" : "14px",
                                    marginTop: "10px",
                                    marginLeft: tablet ? "25px" : ""
                                }}>
                                Vas a transferir
                            </Typography>
                            {isSettingAmount ?
                                (<IconButton
                                    // disabled={amount === "" || error !== ""}
                                    data-testid="icon-button-done"
                                    onClick={() => doneChangeAmount()}
                                    sx={{
                                        cursor: (error !== "") ? "not-allowed !important" : "pointer",
                                        pointerEvents: "all !important"
                                    }}
                                >
                                    <Done
                                        sx={{
                                            color: (error !== "") ? "#CECECE" : "secondary.main",
                                            fontSize: "35px",
                                            marginLeft: "18px",
                                        }} />
                                </IconButton>)
                                :
                                (<IconButton
                                    data-testid="icon-button-edit"
                                    onClick={() => setIsSetteingAmount(!isSettingAmount)}>
                                    <EditNoteOutlinedIcon
                                        sx={{
                                            color: "secondary.main",
                                            fontSize: "35px",
                                            marginLeft: "18px",
                                        }}
                                    />
                                </IconButton>)
                            }
                        </Box>
                        {isSettingAmount ?
                            (<TextField
                                value={amount}
                                autoFocus
                                type="number"
                                onChange={(e) => changeAmount(e)}
                                sx={{
                                    backgroundColor: "primary.main",
                                    width: '100%',
                                    fontSize: desktop ? "22px" : "16px",
                                    marginTop: "10px",
                                    marginLeft: tablet ? "25px" : "",
                                    fieldset: { borderColor: 'transparent' },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'transparent',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'transparent',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                            '-webkit-appearance': 'none',
                                        },
                                    },
                                }}
                                inputProps={{
                                    "data-testid": "input-change-amount",
                                    style: {
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        paddingLeft: 4,
                                        color: 'white',
                                        fontWeight: "bold",
                                        fontSize: desktop ? "22px" : "16px",
                                    },
                                }}
                            />)
                            :
                            (<Typography
                                data-testid="amout-text"
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    width: '100%',
                                    fontSize: desktop ? "22px" : "16px",
                                    marginTop: "10px",
                                    marginLeft: tablet ? "25px" : ""
                                }}>
                                ${deposit.amount}
                            </Typography>)
                        }
                        <Typography
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: desktop ? "16px" : "12px !important",
                                marginTop: "23px",
                                marginLeft: tablet ? "25px" : ""
                            }}>
                            Para
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: desktop ? "25px" : "20px",
                                marginLeft: tablet ? "25px" : ""
                            }}>
                            Cuenta propia
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: 16,
                                marginTop: "23px",
                                marginLeft: tablet ? "25px" : ""
                            }}>
                            {deposit.card_type}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                width: '100%',
                                fontSize: desktop ? "14px" : "14px !important",
                                marginLeft: tablet ? "25px" : ""
                            }}>
                            Terminada en {lastFourDigits(deposit.card_number)}
                        </Typography>
                        {tablet &&
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    disabled={amount === "" || error !== "" || isSettingAmount}
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
                                        height: "50px",
                                        marginTop: "30px",
                                        ":disabled": {
                                            backgroundColor: "#CECECE"
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#dbfc90",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                        },
                                    }}
                                >
                                    Confirmar
                                </Button>
                                <Button
                                    variant="contained"
                                    // onClick={() => { router.reload() }}
                                    onClick={() => { previousStep() }}
                                    sx={{
                                        backgroundColor: "grey",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
                                        height: "50px",
                                        marginTop: "15px",
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#c7c9c5",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                        },
                                    }}
                                >
                                    Atrás
                                </Button>
                            </>
                        }
                        {laptop &&
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="contained"
                                    // onClick={() => { router.reload() }}
                                    onClick={() => { previousStep() }}
                                    sx={{
                                        backgroundColor: "grey",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
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
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    disabled={amount === "" || error !== "" || isSettingAmount}
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 10,
                                        paddingY: 1,
                                        height: "50px",
                                        ":disabled": {
                                            backgroundColor: "#CECECE"
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#dbfc90",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                        },
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </Box>
                        }
                        {desktop &&
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="contained"
                                    // onClick={() => {router.reload()}}
                                    onClick={() => { previousStep() }}
                                    sx={{
                                        backgroundColor: "grey",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
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
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    disabled={amount === "" || error !== "" || isSettingAmount}
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 10,
                                        paddingY: 1,
                                        height: "50px",
                                        ":disabled": {
                                            backgroundColor: "#CECECE"
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#dbfc90",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                        },
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </Box>
                        }
                    </Grid>
                    {mobile &&
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={() => handleClick()}
                                    disabled={amount === "" || error !== "" || isSettingAmount}
                                    sx={{
                                        backgroundColor: "secondary.main",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
                                        height: "50px",
                                        ":disabled": {
                                            backgroundColor: "#CECECE"
                                        },
                                        "&:hover": {
                                            transitionDelay: "0.05s",
                                            backgroundColor: "#dbfc90",
                                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                                        },
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    // onClick={() => { router.reload() }}
                                    onClick={() => { previousStep() }}
                                    sx={{
                                        backgroundColor: "grey",
                                        borderRadius: 2,
                                        color: "black",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: 16,
                                        paddingX: 5,
                                        paddingY: 1,
                                        height: "50px",
                                        marginTop: "15px",
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
                        <Typography
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

export default Voucher;