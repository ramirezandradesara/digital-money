import { Container, Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import IndexButtons from "@/components/dashboard/indexButtons";
import AvalibleMoney from "@/components/dashboard/avalibleMoney";
import { NextPage } from "next";
import HomeLayout from "@/components/layouts/layout-home";
import { theme } from "@/styles/material-theme";
import InfoPageText from "@/components/dashboard/infoPageText";
import Activity from '@/components/dashboard/activity/Activity';


const Home: NextPage = () => {
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const tablet = useMediaQuery(theme.breakpoints.between("tablet", "laptop"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login")
    }
  }, []);

  return (
    <>
      <Container
        sx={{
          backgroundColor: "primary.main",
          minWidth: "100%",
          minHeight: mobile || tablet ? '120vh' : '100vh',
          display: "flex",
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <Grid
          container
          spacing={4}
          direction="column"
          sx={{
            marginTop: 0,
            marginLeft: 0,
            backgroundColor: "secondary.light",
            paddingX: tablet || mobile ? 3 : 10,
            paddingY: mobile ? 4 : 6,
            gap: mobile ? 2 : 3,
          }}
        >
          {mobile && (<InfoPageText />)}
          <AvalibleMoney />
          <IndexButtons />
          <Activity />
        </Grid>
      </Container>
    </>
  );
};

(Home as any).Layout = HomeLayout;

export default Home;
