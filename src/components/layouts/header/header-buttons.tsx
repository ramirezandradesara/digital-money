import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, styled } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Logout from "@/components/logout/logout";
import { c } from "msw/lib/glossary-de6278a9";

type Props = {
  variant?: "index" | "signIn" | "home" | null;
};

const HeaderButtons: FC<Props> = ({ variant }: Props) => {
  const [currentToken, setCurrentToken] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentToken(true);
    }
  }, []);

  const router = useRouter();
  const path = router.asPath;
  if (variant == "index" && !currentToken)
    return (
      <Box sx={{ "& .MuiButton-root": { textTransform: "none" } }}>
        <Grid container columnSpacing={{ mobile: 1, tablet: 2 }}>
          <Grid item mobile={5}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/login")}
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item mobile={7}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push("/register")}
              fullWidth
              sx={{ fontWeight: "bold" }}
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
    else if(path === "/register")
      return(
        <Box>
          <Button variant="contained" onClick={() => router.push("/login")}>
          Iniciar sesion
        </Button>
        </Box>
      )
  // else if (variant == "home" && currentToken)
  //   return (
  //     <Box>
        
  //       <Logout />
  //     </Box>
  //   );
  else return <></>;
};

export default HeaderButtons;
