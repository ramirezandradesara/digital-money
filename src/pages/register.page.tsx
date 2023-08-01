import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RegisterForm from "../components/register/RegisterForm";
import MetadataHead from "../shared/items/MetadataHead";
import { getAuthStorage } from "../utils/types/auth";
import GeneralLayout from "@/components/layouts/layout-general";

const Register = () => {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);

  /**
   * useEffect Method will redirect to home page if all validations related to the form register are correct and a token is successfully created
   */
  useEffect(
    () => {
      const token = getAuthStorage();
      !token && setPermission(true);
      token && router.push("/dashboard");
    },
  
    []
  );

  return (
    <>
      <MetadataHead
        title="DMH | Registro"
        content="Completá el formulario con tus datos para crear tu cuenta."
      />
      {permission && <RegisterForm />}
    </>
  );
};

(Register as any).Layout = GeneralLayout;

export default Register;