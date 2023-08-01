import { Button, Grid, useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";
import { theme } from "@/styles/material-theme";

const IndexButtons: FC = () => {
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

  return (
    <Grid
      item
      data-testid="grid-index-buttons"
      sx={{
        paddingTop: "0 !important",
        paddingLeft: "0 !important",
        display: "flex",
        flexDirection: tablet || mobile ? "column" : "row",
        gap: 2,
        minHeight: 100,
      }}
    >
      <Button
        data-testid="button-charge-index-buttons"
        variant="contained"
        sx={{
          width: tablet || mobile ? "100%" : "50%",
          minHeight: "100%",
          padding: 0,
          borderRadius: 2,
          backgroundColor: "secondary.main",
          color: "black",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: 20,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          transitionDelay: "0.05s",
          "&:hover": {
            color: "#FFFFFF !important",
            transitionDelay: "0.05s",
          },
        }}
      >
        <NextLink href={`/dashboard/charge`} passHref>
          <MUILink
            variant="button"
            underline="none"
            sx={{
              width: "100%",
              height: "100%",
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transitionDelay: "0.05s",
              "&:hover": {
                color: "#FFFFFF !important",
                transitionDelay: "0.05s",
              },
            }}
          >
            Cargar dinero
          </MUILink>
        </NextLink>
      </Button>
      <Button
      data-testid="button-services-index-buttons"
        variant="contained"
        sx={{
          width: tablet || mobile ? "100%" : "50%",
          minHeight: "100%",
          padding: 0,
          borderRadius: 2,
          backgroundColor: "secondary.main",
          color: "black",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: 20,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          transitionDelay: "0.05s",
          "&:hover": {
            color: "#FFFFFF !important",
            transitionDelay: "0.05s",
          },
        }}
      >
        <NextLink href={`/dashboard/services`} passHref>
          <MUILink
            variant="button"
            underline="none"
            sx={{
              width: "100%",
              height: "100%",
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transitionDelay: "0.05s",
              "&:hover": {
                color: "#FFFFFF !important",
                transitionDelay: "0.05s",
              },
            }}
          >
            Pago de servicios
          </MUILink>
        </NextLink>
      </Button>
    </Grid>
  );
};

export default IndexButtons;
