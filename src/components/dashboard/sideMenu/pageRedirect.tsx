import { Typography, useMediaQuery } from "@mui/material";
import React, { FC, useContext } from "react";
import { useRouter } from "next/router";
import { DataUser } from "../../../context/UserDataContext";
import { theme } from "@/styles/material-theme";

type Props = {
  variant: string;
};

const Pageredirect: FC<Props> = ({ variant }) => {
  const router = useRouter();
  const { setUserData } = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

  const handleClick = (text: string) => {
    if (text === "Inicio") router.push("/dashboard");
    if (text === "Actividad") router.push("/dashboard/activity");
    if (text === "Tu perfil") router.push("/dashboard/profile");
    if (text === "Cargar dinero") router.push("/dashboard/charge");
    if (text === "Pagar servicios") router.push("/dashboard/services");
    if (text === "Tarjetas") router.push("/dashboard/cards");

    if (text === "Cerrar sesión") {
      localStorage.clear();
      setUserData("");
      router.push("/");
    }
  };

  const showSelectedItem = (variant: string) => {
    const path = router.asPath;

    if (variant === "Inicio" && path === "/dashboard") {
      return 900;
    }
    if (variant === "Actividad" && path === "/dashboard/activity") {
      return 900;
    }
    if (variant === "Tu perfil" && path === "/dashboard/profile") {
      return 900;
    }
    if (variant === "Cargar dinero" && path === "/dashboard/charge") {
      return 900;
    }
    if (variant === "Cargar dinero" && path === "/dashboard/charge/card") {
      return 900;
    }    
    if (variant === "Pagar servicios" && path === "/dashboard/services") {
      return 900;
    }
    if (variant === "Tarjetas" && path === "/dashboard/cards") {
      return 900;
    }
    if (variant === "Cerrar sesión") {
      return 300;
    } else {
      return 600;
    }
  };

  return (
    <Typography
      onClick={() => handleClick(variant)}
      sx={{
        fontWeight: showSelectedItem(variant),
        fontSize: mobile
          ? "11pt !important"
          : tablet
          ? "12pt !important"
          : "15pt !important",
        paddingX: mobile || tablet ? 2 : 4,
        paddingY: 1,
        "&:hover": {
          backgroundColor: "#00000047",
          cursor: "pointer",
          color: "white",
        },
      }}
    >
      {variant}
    </Typography>
  );
};

export default Pageredirect;
