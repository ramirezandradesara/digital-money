import GeneralLayout from "../components/layouts/layout-general";
import { theme } from "@/styles/material-theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import UserDataContext from "../context/UserDataContext";
import Head from "next/head";
import { StepProvider } from "@/context/StepContext";
import ActivityProvider from "../context/activity/ActivityContext";

function App({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout || GeneralLayout;
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Digital Money House</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <UserDataContext>
        <StepProvider>
          <CssBaseline />
          <ActivityProvider>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ActivityProvider>
          <style jsx global>{`
          /* Other global styles such as 'html, body' etc... */

          #__next {
              height: 100%;
          }
        `}</style>
        </StepProvider>
      </UserDataContext>

    </ThemeProvider>
  );
}

export default App;
