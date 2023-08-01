import { Box, IconButton } from "@mui/material";
import React, { useContext } from "react";
import SideMenuGeneral from "./sideMenuGeneral";
import AvatarNameText from "@/components/layouts/header/avatarNameText";
import CloseIcon from "@mui/icons-material/Close";
import { DataUser } from "../../../context/UserDataContext.jsx";

const SideMenuMobile = () => {
  const { setModalFlag } = useContext(DataUser);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <Box
        sx={{
          height: 130,
          minWidth: "100%",
          backgroundColor: "primary.main",
          position: "relative",
          paddingY: 0.5,
          paddingX: 2,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <AvatarNameText />
        <IconButton
          data-testid="hide-side-menu-mobile"
          onClick={() => setModalFlag(false)}
          sx={{
            color: "secondary.main",
            position: "absolute",
            top: 5,
            right: 5,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <SideMenuGeneral />
    </Box>
  );
};

export default SideMenuMobile;
