import React from 'react'
import { Box, Button, Typography } from "@mui/material";

function DetailsModal({ service, setModal }: { service: undefined | Service, setModal: any }) {

    const handleBackdropClick = (e: any) => {
        if (e.target === e.currentTarget) {
            setModal(false);
        }
    };

    return (
        <Box
            data-testid="modal-payment"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#49474755",
                minHeight: "100%",
                minWidth: "100%",
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 1500,
            }}
            onClick={handleBackdropClick}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: { mobile: 350, tablet: 600, laptop: 500, desktop: 500 },
                    backgroundColor: "primary.main",
                    borderRadius: "15px",
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: "secondary.main",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: 3,
                        borderRadius: "15px 15px 0px 00px",
                    }}>
                    <Typography sx={{ fontWeight: "bold", textAlign: "center", paddingY: '20px' }}>
                        Detalles del pago
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '70%',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 2
                    }}
                >
                    <Box sx={{ width: '100%', display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", color: 'white', fontSize: '16px' }}>
                            ID: &nbsp;
                        </Typography>
                        <Typography sx={{ color: 'white', fontSize: '16px' }} >
                            {service?.id}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", color: 'white', fontSize: '16px' }}>
                            Nombre: &nbsp;
                        </Typography>
                        <Typography sx={{ color: 'white', fontSize: '16px' }} >
                            {service?.name}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", color: 'white', fontSize: '16px' }}>
                            Fecha: &nbsp;
                        </Typography>
                        <Typography sx={{ color: 'white', fontSize: '16px' }}>
                            {service?.date}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold", color: 'white', fontSize: '16px' }}>
                            Importe: &nbsp;
                        </Typography>
                        <Typography sx={{ color: 'white', fontSize: '16px' }}>
                            ${service?.invoice_value}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: "bold",
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        textTransform: 'none',
                        marginBottom: 2,
                        "&:hover": {
                            transitionDelay: "0.05s",
                            backgroundColor: "#dbfc90",
                            boxShadow: "2px 2px 9px 0px rgba(143,143,143,1)"
                        },
                    }}
                    onClick={() => setModal(false)}
                >
                    Volver
                </Button>
            </Box>
        </Box>)
}

export default DetailsModal