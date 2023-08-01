import { number, object, ref, string } from "yup";
// data validator schema for user registration form using Yup
export const registerSchema = object().shape({
  firstName: string()
    .matches(/^[a-zA-Z]+$/, "No se permiten números en este campo")
    .min(2).max(20).matches(/^[A-Za-z]+$/, "Debe contener solo letras")
    .min(2, "Debes ingresar un mínimo de 2 caracteres")
    .max(20, "Debes ingresar un máximo de 20 caracteres")
    .required(""),
  lastName: string()
    .matches(/^[a-zA-Z]+$/, "No se permiten números en este campo")
    .min(2).max(20).matches(/^[A-Za-z]+$/, 'Debe contener solo letras')
    .min(2, "Debes ingresar un mínimo de 2 caracteres")
    .max(20, "Debes ingresar un máximo de 20 caracteres")
    .required(""),
  dni: number()
    .typeError("Tu DNI solo debe incluir números")
    .required("")
    .test("longitud", "Tu DNI debe contener entre 8 y 15 digitos", (value) =>
      value
        ? value.toString().length > 7 && value.toString().length < 16
        : false
    ),
  email: string()
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Debes ingresar un formato de email válido")
    .matches(/.com|.co/, "Debes ingresar un formato de email válido")
    .email("Debes ingresar un formato de email válido")
    .required(""),
  password: string()
    .required("")
    .matches(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).{6,20}$/,
      "Debes cumplir con las condiciones requeridas para la contraseña"
    ),
  confirmPassword: string()
    .oneOf([ref("password")], "Las contaseñas deben coincidir")
    .required(""),
  phone: string()
    .matches(/^[0-9]+$/, "Tu teléfono solo debe incluir números")
    .min(7, "Debes ingresar un mínimo de 7 dígitos")
    .max(15, "Debes ingresar un máximo de 15 digitos")
    .required(""),
});
