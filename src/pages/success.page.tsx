import { Grid, Stack } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  SuccessIconBox,
  PrimaryButton,
  SuccessTitle,
  BodyCenter,
} from "../shared/styled/Register";
import MetadataHead from "../shared/items/MetadataHead";

const RegisterSuccess: NextPage = () => {
  return (
    <>
      <MetadataHead title="DMH | Registro exitoso" content="Registro exitoso" />
      <BodyCenter>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item mobile={10} tablet={8} laptop={6} desktop={4}>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"20px"}
              width={"100%"}
            >
              <SuccessTitle>Registro Exitoso</SuccessTitle>
              <SuccessIconBox>
                <CheckCircleOutlineIcon
                  sx={{
                    color: "#C1FD35",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </SuccessIconBox>
              <PrimaryButton variant="contained" href="/login">
                Continuar
              </PrimaryButton>
            </Stack>
          </Grid>
        </Grid>
      </BodyCenter>
    </>
  );
};

export default RegisterSuccess;
