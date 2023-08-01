import { Typography, Button, Box, styled } from "@mui/material";

export const BodyCenter = styled(Box)(() => ({
  minHeight: "calc(100vh - 104px)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 20px 100px 20px",
  backgroundColor: "#201F22",
  [`@media screen and (min-width: 768px)`]: {
    padding: "0px 0px",
  },
  [`@media screen and (min-width: 1024px)`]: {
    padding: "0px 20px",

  },



}));

export const BodyCenterActivity = styled(Box)(() => ({
   width: "100%",
   backgroundColor: "#EEEAEA",
   minHeight: "calc(100vh - 104px)",
   padding: "20px",
    [`@media screen and (min-width: 1280px)`]: {
      padding: "49px  82px",
    },

    
}));


export const PrimaryButton = styled(Button)(() => ({
  height: "60px",
  width: "100%",
  color: "#201F22",
  borderRadius: "6px",
  fontWeight: "bold",
  textTransform: "none",
  background: "#C1FD35",
  "&:hover": {
    background: "rgba(193, 253, 53, 0.6)",
  },
  "&:disabled": {
    backgroundColor: "#CECECE",
    color: "#2A292C",
  },
}));

export const FormError = styled(Typography)(() => ({
  color: "#FF5050",
  textAlign: "center",
  fontStyle: "italic",
}));

export const SuccessIconBox = styled(Box)(() => ({
  height: "97.4px",
  width: "94.6px",

  [`@media screen and (min-width: 768px)`]: {
    width: "86.22px",
    height: " 89.03px",
  },
}));

export const SuccessTitle = styled(Typography)(() => ({
  color: "#fff",
  fontWeight: "400",
  fontSize: "34px",
  textAlign: "center",
  [`@media screen and (min-width: 768px)`]: {
    fontSize: "64px",
  },
}));
