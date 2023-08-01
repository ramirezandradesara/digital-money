import { Box, Stack, useMediaQuery } from "@mui/material";
import { FC, PropsWithChildren, useContext } from "react";
import GeneralHeader from "./header/general-header";
import GeneralFooter from "./footer/general-footer";
import { theme } from "@/styles/material-theme";
import SideMenuGeneral from "../dashboard/sideMenu/sideMenuGeneral";
import SideMenuMobile from "../dashboard/sideMenu/sideMenuMobile";
import { DataUser } from '../../context/UserDataContext.jsx';

const HomeLayout: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { modalFlag, setModalFlag } = useContext(DataUser);
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <>
      <Stack direction="column" height="100%">
        <GeneralHeader variant="home" />
        <Box
          display="flex"
          flexGrow={1}
          minWidth={"100%"}
          marginBottom={"5vh"}
        >
          {(mobile) && (
            <Box
              onClick={() => setModalFlag(false)}
              sx={{
                position: "fixed",
                zIndex: 5,
                minHeight: "100%",
                minWidth: "100%",
                visibility: modalFlag ? "visible" : "hidden",
                backgroundColor: "#49474755",
                opacity: modalFlag ? 1 : 0,
                transition: "all 0.5s linear",
              }}
            ></Box>
          )}
          {!mobile && (
            <Box sx={{ width: "20%", backgroundColor:'secondary.main' }}>
              <SideMenuGeneral />
            </Box>
          )}
          <Box sx={{ width: mobile ? "100%": "80%", minHeight: "100%" }}>{children}</Box>
          {(mobile) && (
            <Box
              sx={{
                width: "45%",
                position: "fixed",
                top: 0,
                right: mobile && modalFlag ? 0 : -300,
                visibility: modalFlag ? "visible" : "hidden",
                overflow: "hidden",
                zIndex: 15,
                minHeight: "100%",
                backgroundColor: "secondary.main",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <SideMenuMobile />
            </Box>
          )}
        </Box>
        <GeneralFooter />
      </Stack>
    </>
  );
};
export default HomeLayout;
