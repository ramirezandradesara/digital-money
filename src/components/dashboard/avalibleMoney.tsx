import { Box, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useContext, useState } from "react";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataUser } from "../../context/UserDataContext";
import { theme } from "@/styles/material-theme";

const AvalibleMoney: FC = () => {
  const [showMoney, setShowMoney] = useState<boolean>(true);
  const { userData } = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

  const transformToNumber = (amount: number) => {
    const opciones = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    const formatedAmount = amount?.toLocaleString(undefined, opciones);
    return formatedAmount;
  };

  return (
    <Grid
      item
      sx={{
        backgroundColor: "primary.main",
        borderRadius: 1,
        position: "relative",
        minWidth: "100%",
        height: 200,
        paddingLeft: "0 !important",
        paddingTop: "0 !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingY: 5,
        paddingX: 4,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: "white",
            width: "70%",
            paddingX: 1,
            fontWeight: "bold",
            fontSize: mobile || tablet ? "12pt !important" : "15pt !important",
          }}
        >
          Dinero disponible
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
          <Typography
            data-testid="amount-avalible-money"
            sx={{
              border: "solid #C1FD35",
              borderWidth: 2,
              color: "white",
              borderRadius: 7,
              paddingY: 1,
              paddingX: 2,
              width: "fit-content",
              fontWeight: "bold",
              fontSize:
                mobile || tablet ? "12pt !important" : "20pt !important",
            }}
          >
            {userData === null || userData?.firstname === undefined ? (
              <Skeleton
                data-testid="skeleton-avalible-money"
                variant="rectangular"
                sx={{
                  bgcolor: "grey.500",
                  borderRadius: 4,
                  width: { mobile: 80, tablet: 80, laptop: 160, desktop: 160 },
                  height: { mobile: 20, tablet: 25, laptop: 38, desktop: 38 },
                }}
              />
            ) : (
              <>
                ${" "}
                {showMoney
                  ? transformToNumber(userData?.available_amount)
                  : "*****"}
              </>
            )}
          </Typography>
          {showMoney ? (
            <IconButton
              data-testid="visibility-avalible-money"
              onClick={() => setShowMoney(false)}
            >
              <Visibility sx={{ color: "white" }} />
            </IconButton>
          ) : (
            <IconButton
              data-testid="visibility-off-avalible-money"
              onClick={() => setShowMoney(true)}
            >
              <VisibilityOff sx={{ color: "white" }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          minWidth: 100,
          minHeight: 10,
          top: 25,
          right: 40,
          display: "flex",
          gap: 2,
        }}
      >
        <Typography
        data-testid="link-cards-avalible-money"
          sx={{
            fontSize: 14,
          }}
        >
          <NextLink href={`/dashboard/cards`} passHref>
            <MUILink
              variant="button"
              sx={{
                color: "white",
                fontWeight: "normal",
                textTransform: "none",
                textDecoration: "underline",
                transitionDelay: "0.05s",
                "&:hover": {
                  color: "lightgray !important",
                  transitionDelay: "0.05s",
                },
              }}
            >
              Ver Tarjetas
            </MUILink>
          </NextLink>
        </Typography>
        <Typography
        data-testid="link-profile-avalible-money"
          sx={{
            fontSize: 14,
          }}
        >
          <NextLink href={`/dashboard/profile`} passHref>
            <MUILink
              variant="button"
              sx={{
                color: "white",
                fontWeight: "normal",
                textTransform: "none",
                textDecoration: "underline",
                transitionDelay: "0.05s",
                "&:hover": {
                  color: "lightgray !important",
                  transitionDelay: "0.05s",
                },
              }}
            >
              Ver CVU
            </MUILink>
          </NextLink>
        </Typography>
      </Box>
    </Grid>
  );
};

export default AvalibleMoney;
