import React from 'react';
import { useRouter } from 'next/router';
import PayServiceError from '@/components/payServices/PayServiceError';
import HomeLayout from '@/components/layouts/layout-home';
import { Container, useMediaQuery } from '@mui/material';
import { theme } from '@/styles/material-theme';

function ErrorPayment() {
    const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));

    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <Container
            sx={{
                backgroundColor: "secondary.light",
                minWidth: "100%",
                minHeight: mobile || tablet ? "110vh" : "100vh",
                display: "flex",
                flexDirection: "column",
                paddingX: tablet || mobile ? 3 : 10,
                paddingY: mobile ? 4 : 6,
                gap: mobile ? 2 : 3,
            }}>

            <PayServiceError
                text='Hubo un problema con tu pago'
                description='Puede deberse a fondos insuficientes. Comunícate con la entidad emisora de la tarjeta'
                buttonText='Volver a intentarlo'
                handleClick={() => handleClick()}
            /> 

        </Container>
    )
}

(ErrorPayment as any).Layout = HomeLayout;

export default ErrorPayment