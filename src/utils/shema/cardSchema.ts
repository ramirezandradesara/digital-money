import * as yup from "yup";

export const CardFormSchema = yup.object({
  number: yup
    .string()
    .required("El número de la tarjeta es requerido")
    .matches(/^[0-9]+$/, "La tarjeta solo debe incluir números")
    .min(16, "Ingrese los 16 dígitos de la tarjeta")
    .max(16, "Ingrese los 16 dígitos de la tarjeta"),

  cvc: yup
    .string()
    .required("El código de seguridad es requerido")
    .matches(/^[0-9]+$/, "El código de seguridad solo debe incluir números")
    .min(3, "Ingrese 3 números")
    .max(3, "Ingrese 3 números"),

  name: yup
    .string()
    .required("El nombre de la tarjeta es requerido")
    .matches(/^[a-zA-Z\s]*$/, "El nombre de tarjeta debe contener solo letras"),

  expiry: yup
    .string()
    .required("La fecha de expiración es requerida")
    .min(7, "El formato debe ser MM/YYYY")
    .max(7, "El formato debe ser MM/YYYY"),
});