import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, Typography } from "@mui/material";
import ControlledTextInput from '../../../../shared/form/ControlledTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { ICardForm } from '../../../../utils/types/interfaces.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormError, PrimaryButton } from "../../../../shared/styled/Register";
import { CardFormSchema } from '../../../../utils/shema/cardSchema';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import router from 'next/router';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { DataUser } from "../../../../context/UserDataContext";
import HomeLayout from '../../../../components/layouts/layout-home';
import { checkExpDate } from '../../../../helpers/checkExpDate';

function AddCard() {
    const [error, setError] = useState<string>("");
    const { userData } = useContext(DataUser);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login")
        }
      }, []);    

    /**
     * Function that sends form
     */
    const onSubmit = async (data: any) => {
        const token = localStorage.getItem('token')

        if (checkExpDate(data.expiry)) {
            return setError("La fecha de expiración debe ser una fecha futura.");
        };

        const formData = {
            cod: parseInt(data.cvc),
            expiration_date: data.expiry,
            first_last_name: data.name,
            number_id: parseInt(data.number)
        };

        fetch(`https://digitalmoney.ctd.academy/api/accounts/${userData?.id}/cards`, {
            method: "POST",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data['error']) {
                    setError(data['error']);
                } else {
                    router.push({ pathname: "/dashboard/cards" })
                };
            })
            .catch((error: any) => {
                console.error(error)
            });
    };

    const form = useForm<ICardForm>({
        defaultValues: {
            number: '',
            expiry: '',
            name: '',
            cvc: '',
        },
        resolver: yupResolver(CardFormSchema),
    });

    const {
        handleSubmit,
        formState: { errors },
        watch
    } = form;

    const { number, expiry, name, cvc } = watch();

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
                minHeight: '90vh'
            }}
        >
            <Box sx={{ display: { mobile: 'flex', tablet: 'none' }, alignItems: 'center', }}>
                <ArrowForwardRoundedIcon sx={{ fontSize: '25px', color: '#0000008c' }} />
                <Typography variant={"h4"} sx={{ marginLeft: '10px' }}>
                    Tarjetas
                </Typography>
            </Box>
            <Grid sx={{ backgroundColor: "#FFFFFF", borderRadius: 1, padding: { mobile: 3, tablet: 5, laptop: 5, desktop: 5 } }}>
                <Box paddingBottom={5}>
                    <Cards
                        number={number}
                        cvc={cvc}
                        expiry={expiry}
                        name={name}
                    />
                </Box>

                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid
                            container
                            columnSpacing={5}
                            sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                        >
                            <Grid item columnSpacing={5} mobile={12} tablet={11} laptop={5} desktop={5}>
                                <ControlledTextInput
                                    name="number"
                                    placeholder="Número de la tarjeta*"
                                />
                                <ControlledTextInput
                                    name="name"
                                    placeholder="Nombre y apellido*"
                                />
                            </Grid>
                            <Grid item mobile={12} tablet={11} laptop={5} desktop={5}>
                                <ControlledTextInput
                                    name="expiry"
                                    placeholder="Fecha de vencimiento*"
                                />
                                <ControlledTextInput
                                    name="cvc"
                                    placeholder="Código de seguridad*"
                                />
                                <PrimaryButton
                                    variant="contained"
                                    fullWidth
                                    disabled={number === '' || expiry === '' || name === '' || cvc === ''}
                                    onClick={handleSubmit(onSubmit)}
                                    aria-label="crear tarjeta"
                                >
                                    Continuar
                                </PrimaryButton>
                            </Grid>
                        </Grid>
                        {error && <FormError>{error}</FormError>}
                    </form>
                </FormProvider>
            </Grid>
        </Grid >
    )
}

(AddCard as any).Layout = HomeLayout;

export default AddCard