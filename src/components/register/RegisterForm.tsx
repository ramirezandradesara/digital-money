import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Grid, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import FormBox from "../../shared/form/FormBox";
import Spinner from "../../shared/items/Spinner";
import { registerSchema } from "../../utils/shema/registerShema";
import { IRegisterForm } from "../../utils/types/interfaces.types";
import ControlledTextInput from "../../shared/form/ControlledTextInput";

import {
  BodyCenter,
  PrimaryButton,
  FormError,
} from "../../shared/styled/Register";
import { RegisterType } from "@/service/users.service";

const RegisterForm = () => {
  const form = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async ({
    email,
    dni,
    firstName,
    lastName,
    password,
    phone,
  }: RegisterType) => {
    setError("");
    setLoading(true);
    let response;
    try {
      response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          dni,
          firstName,
          lastName,
          password,
          phone,
        }),
      });
    } catch (e: any) {
      setError(e.message as string);
    } finally {
      if (response?.status === 201) {
        setLoading(false);
        router.push("/success");
      } else if (response?.status === 500) {
        setError("El email ya se encuentra registrado");
      } else {
        setError("Error al crear la cuenta");
      }
    }
  };

  /**
   * useEffect method will validate the required property for the form inputs
   */
  useEffect(() => {
    Object.values(errors).find((err) =>
      err?.type === "required"
        ? setError("Completa los campos requeridos")
        : setError("")
    );
  }, [errors]);

  return (
    <BodyCenter>
      <FormBox title="Crear cuenta">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <Grid container columnSpacing={3}>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput name="firstName" placeholder="Nombre*" />
              </Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput name="lastName" placeholder="Apellido*" />
              </Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput name="dni" placeholder="DNI*" />
              </Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput
                  name="email"
                  placeholder="Correo electrónico*"
                />
              </Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={12} tablet={10} laptop={6} desktop={6}>
                <Typography
                  sx={{
                    color: "#EEEAEA",
                    fontSize: "14px",
                    margin: "14px 0",
                    textAlign: "center",
                    "@media (max-width: 1024px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
                  carácter especial, una mayúscula y un número)
                </Typography>
              </Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput
                  name="password"
                  placeholder="Contraseña*"
                  passwordAdornment
                />
              </Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña*"
                  passwordAdornment
                />
              </Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <ControlledTextInput name="phone" placeholder="Teléfono*" />
              </Grid>
              <Grid item mobile={12} tablet={5} laptop={3} desktop={3}>
                <PrimaryButton
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                  aria-label="crear cuenta"
                >
                  Crear cuenta
                </PrimaryButton>
              </Grid>
              <Grid item mobile={0} tablet={1} laptop={3} desktop={3}></Grid>
            </Grid>
            {loading && <Spinner />}
            {error && <FormError>{error}</FormError>}
          </FormProvider>
        </form>
      </FormBox>
    </BodyCenter>
  );
};

export default RegisterForm;
