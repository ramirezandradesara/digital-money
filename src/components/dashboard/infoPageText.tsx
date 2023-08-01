import { useRouter } from "next/router";
import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton, Typography } from "@mui/material";

const InfoPageText = ({ pageText }: { pageText?: string | null }) => {
  const router = useRouter();

  const getPageText = () => {
    const path = router.asPath;

    if (path === "/dashboard") {
      return "Inicio";
    }
    if (path === "/dashboard/activity") {
      return "Actividad";
    }
    if (path === "/dashboard/profile") {
      return "Perfil";
    }
    if (path === "/dashboard/charge") {
      return "Cargar dinero";
    }
    if (path === "/dashboard/charge/card") {
      return "Cargar dinero";
    }
    if (path === "/dashboard/charge/externalAccount") {
      return "Cargar dinero";
    }
    if (path === "/dashboard/services") {
      return "Pagar servicios";
    }
    if (path === "/dashboard/cards") {
      return "Tarjetas";
    }
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1  }}>
      <IconButton sx={{padding: 0}}>
        <ArrowForwardIcon />
      </IconButton>
      <Typography  sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", textDecoration: "underline", paddingBottom: 0.2, fontSize: "13pt !important" }}>{getPageText() || pageText}</Typography>
    </Box>
  );
};

export default InfoPageText;
