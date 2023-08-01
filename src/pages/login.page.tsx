import LoginForm from "@/components/form/LoginForm";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Container, Grid } from "@mui/material";
import { ALERT_LOGIN_FAIL, EMAIL_REQUIRED, INVALID_CREDENTIALS, PASSWORD_REQUIRED, USER_NOT_FOUND } from "@/helpers/loginErros";
import BodySingle from "@/components/layouts/body/single/body-single";
import { DataUser } from "../context/UserDataContext";
import GeneralLayout from "@/components/layouts/layout-general";
import Head from "next/head";

interface IStepSchemas {
    [key: number]: yup.AnyObjectSchema;
};

type Data = {
    email: string,
    password: string
};

const schemas: IStepSchemas = {
    0: yup.object({
        email: yup.string().email().required(EMAIL_REQUIRED)
    }).required(),
    1: yup.object({
        password: yup.string().required(PASSWORD_REQUIRED)
    }).required()
};

const Login = () => {
    const router = useRouter();
    const [step, setStep] = useState<number>(0);
    const [alert, setAlert] = useState("");
    const [fail, setFail] = useState(false)

    const { setUserData } = useContext(DataUser);

    const getResolver = () => yupResolver<yup.AnyObjectSchema>(schemas[step]);

    const { handleSubmit, formState: { errors }, control, setError, getValues, clearErrors } = useForm({
        // defaultValues: {
        //     email: "",
        //     password: ""
        // },
        resolver: getResolver()
    });

    const validate = async (): Promise<boolean> => {
        try {
            await schemas[step].validate(getValues(), { abortEarly: false });
            return true;
        } catch (error: any) {
            const inputs_errors = error.inner;
            for (let index = 0; index < inputs_errors.length; index++) {
                setError(`${inputs_errors[index].path}`, {
                    type: "focus",
                    message: `${inputs_errors[index].message}`
                }, { shouldFocus: true })
            }
            return false;
        }
    };

    const getUserData = async (id: number, token: string) => {
        await fetch(`https://digitalmoney.ctd.academy/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: token, 
        }
        }).then(res => res.json())
        .then(data => {
            const {firstname, lastname, email, dni, phone} = data
            setUserData((prevState: any) => ({
                ...prevState,
                firstname,
                lastname,
                email,
                dni,
                phone
            }))
        })
        .catch(error => console.log(error))
    }

    const getAccountData = async (token : string) => {
        await fetch(`https://digitalmoney.ctd.academy/api/account`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                authorization: token, 
            }
        }).then(res => res.json())
        .then(data => {
            setUserData(data)
            getUserData(data.user_id, token)
    })
        .catch(error => console.log(error));
    }

    const postLoginApi = async (data: Data) => {
        let singIn = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return singIn;
    };

    const setPreviosStep = () => {
        setStep(0)
    }

    const setNextStep = async () => {
        const validation: boolean = await validate();

        if (!validation) return;

        const credentials = {
            email: getValues('email'),
            password: "1"
        };

        try {
            let singIn = await postLoginApi(credentials);
            const res = await singIn.json()

            if (res.error === USER_NOT_FOUND || res.error === INVALID_CREDENTIALS) {
                setFail(true);
                setStep(1);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data: any) => {
        const credentials = {
            email: data.email,
            password: data.password
        };

        try {
            let singIn = await postLoginApi(credentials)
            const res = await singIn.json()

            if (res.error === USER_NOT_FOUND || res.error === INVALID_CREDENTIALS) {
                setAlert(ALERT_LOGIN_FAIL)
            }

            if (res.hasOwnProperty('token')) {
                localStorage.setItem('token', res.token)
                getAccountData(res.token)
                setAlert("")
                router.push('/dashboard')
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <BodySingle>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    {step === 0 &&
                        <>
                            <Grid container spacing={2} direction="column">
                                <Grid item mobile={12} tablet={12} laptop={12} desktop={12} sx={{ paddingLeft: '0 !important' }}>
                                    <LoginForm error={!!errors.email} helperText={errors.email ? `${errors.email.message}` : ''} onKeyUp={() => { clearErrors('email') }} control={control} type="text" name="email" label="Correo electronico" title="¡Hola! Ingresá tu e-mail" />
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Grid item mobile={12} tablet={12} laptop={12} desktop={12}>
                                            <Button variant="contained"
                                                sx={{ width: '100%', borderRadius: 2, backgroundColor: "#C1FD35", color: "black", fontFamily: "Open Sans, sans-serif", fontWeight: "bold", boxShadow: "none", marginTop: 2, ":hover": { background: "rgba(193, 253, 53, 0.6)" } }}
                                                onClick={() => setNextStep()}
                                            >
                                                Continuar
                                            </Button>
                                        </Grid>
                                        <Grid item mobile={12} tablet={12} laptop={12} desktop={12}>
                                            <Button variant="contained"
                                                sx={{ width: '100%', borderRadius: 2, backgroundColor: "#CECECE", color: "black", fontFamily: "Open Sans, sans-serif", fontWeight: "bold", boxShadow: "none", marginTop: 2, ":hover": { background: "rgba(206,206,206, 0.6)" } }}
                                                onClick={() => router.push('/register')}
                                            >
                                                Crear cuenta
                                            </Button>
                                        </Grid>
                                    </div>
                                </Box>
                            </Grid>
                        </>
                    }
                    {step === 1 &&
                        <>
                            <Grid container spacing={2} direction="column">
                                <Grid item mobile={12} tablet={12} laptop={12} desktop={12} sx={{ paddingLeft: '0 !important' }}>
                                    <LoginForm error={!!errors.password} helperText={errors.password ? `${errors.password.message}` : ''} onKeyUp={() => { clearErrors('password') }} control={control} type="password" name="password" label="Contraseña" title="Ingresá tu contraseña" />
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Grid item mobile={12} tablet={12} laptop={12} desktop={12}>
                                            <Button variant="contained"
                                                type="submit"
                                                sx={{ width: "100%", borderRadius: 2, backgroundColor: "#C1FD35", color: "black", fontFamily: "Open Sans, sans-serif", fontWeight: "bold", boxShadow: "none", marginTop: 2, ":hover": { background: "rgba(193, 253, 53, 0.6)" } }}
                                            >
                                                Continuar
                                            </Button>
                                        </Grid>
                                        <Grid item mobile={12} tablet={12} laptop={12} desktop={12}>
                                            <Button variant="contained"
                                                sx={{ width: '100%', borderRadius: 2, backgroundColor: "#CECECE", color: "black", fontFamily: "Open Sans, sans-serif", fontWeight: "bold", boxShadow: "none", marginTop: 2, ":hover": { background: "rgba(206,206,206, 0.6)" } }}
                                                onClick={() => setPreviosStep()}
                                            >
                                                Atras
                                            </Button>
                                        </Grid>
                                    </div>
                                </Box>
                            </Grid>
                        </>
                    }
                </Box>
                {alert && <h4 style={{ color: "red" }}>{alert}</h4>}
            </BodySingle>
        </>
    )
}

(Login as any).Layout = GeneralLayout;

export default Login;