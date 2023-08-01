import { DataUser } from "../../../context/UserDataContext";
import { theme } from "@/styles/material-theme";
import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const AvatarNameText = () => {
  const { userData } = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const router = useRouter();

  const formatText = (text: string) => {
    return text?.[0].toUpperCase() + text?.toLowerCase().substring(1);
  };
  return (
    <Box
      data-testid="container-avatar-name-text"
      sx={{
        color: mobile ? "secondary.main" : "white",
        padding: 1,
        fontWeight: "bold",
        display: mobile ? "column" : "flex",
        justifyContent: mobile ? "flex-end" : "",
        alignItems: "center",
      }}
    >
      {userData === null || (userData?.firstname === undefined && !mobile) ? (
        <Skeleton
          data-testid="skeleton-avatar-name-text"
          variant="rectangular"
          width={160}
          height={25}
          sx={{ bgcolor: "grey.500", borderRadius: 3 }}
        >
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: "13pt !important",
            }}
          >
            {formatText(userData?.firstname)} {formatText(userData?.lastname)}
          </Typography>
        </Skeleton>
      ) : (
        <>
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: mobile ? "10pt !important" : "13pt !important",
            }}
          >
            Hola,&nbsp;
          </Typography>
          <Typography
            onClick={() => {
              router.push("/dashboard");
            }}
            sx={{
              fontWeight: "medium",
              fontSize: mobile ? "10pt !important" : "13pt !important",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {formatText(userData?.firstname)} {formatText(userData?.lastname)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default AvatarNameText;
