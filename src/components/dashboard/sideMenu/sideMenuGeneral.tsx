import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Pageredirect from "./pageRedirect";
import { theme } from "@/styles/material-theme";

const SideMenuGeneral = () => {
  const pages: string[] = [
    "Inicio",
    "Actividad",
    "Tu perfil",
    "Cargar dinero",
    "Pagar servicios",
    "Tarjetas",
    "Cerrar sesión",
  ];
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Box
      data-testid="box-side-menu-general"
      sx={{
        backgroundColor: "secondary.main",
        minHeight: "100%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingY: mobile ? 3 : 8,
      }}
    >
      {pages.map((page: string) => (
        <Pageredirect variant={page} key={page} />
      ))}
    </Box>
  );
};

export default SideMenuGeneral;
