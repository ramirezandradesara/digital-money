import { createTheme } from "@mui/material";

//Personalización de los breakpoints:
//https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

//EJEMPLO para agregar Typography llamada poster.
/* declare module '@mui/material/styles' {
    interface TypographyVariants {
        poster: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        poster?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        poster: true;
        h3: false;
    }
}

 */

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1300, 
    },
  },

  typography: {
    fontFamily: "Open Sans, sans-serif",
    h1: {
      fontSize: "48px",
      fontWeight: "normal",
    },
    h2: {
      fontSize: "34px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "24px",
      fontWeight: "600",
    },
    h4: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "14px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "12px",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "20px",
    },
    subtitle1: {
      fontSize: "40px",
    },
    subtitle2: {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },

  //https://mui.com/material-ui/customization/color/#main-and-light-colors

  palette: {
    primary: {
      light: "#3A393E",
      main: "#201F22",
    },
    secondary: {
      light: "#EEEAEA",
      main: "#C1FD35",
    },
    error: {
      main: "#DA0000",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  },
});

/******text cards index page******/
//Mobile
(theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.down("tablet")]: {
    fontSize: "11pt", //16
  },
}),
  (theme.typography.subtitle1 = {
    ...theme.typography.h2,
    [theme.breakpoints.down("tablet")]: {
      fontSize: "20pt", //20
    },
  }),
  (theme.typography.h1 = {
    ...theme.typography.h1,
    [theme.breakpoints.down("tablet")]: {
      fontSize: "20pt", //28
    },
  }),
  (theme.typography.h2 = {
    ...theme.typography.h2,
    [theme.breakpoints.down("tablet")]: {
      fontSize: "15.5pt", //21.5
    },
  }),

  //Tablet
  (theme.typography.body1 = {
    ...theme.typography.body1,
    [theme.breakpoints.between("tablet", "laptop")]: {
      fontSize: "14pt", //20
    },
  }),
  (theme.typography.subtitle1 = {
    ...theme.typography.h2,
    [theme.breakpoints.between("tablet", "laptop")]: {
      fontSize: "27pt", //40
    },
  }),
  (theme.typography.h1 = {
    ...theme.typography.h1,
    [theme.breakpoints.between("tablet", "laptop")]: {
      fontSize: "32pt", //48
    },
  }),
  (theme.typography.h2 = {
    ...theme.typography.h2,
    [theme.breakpoints.between("tablet", "laptop")]: {
      fontSize: "22pt", //34
    },
  });

// laptop
(theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.between("laptop", "desktop")]: {
    fontSize: "14pt", //16
  },
}),
  (theme.typography.subtitle1 = {
    ...theme.typography.h2,
    [theme.breakpoints.between("laptop", "desktop")]: {
      fontSize: "28pt", //20
    },
  }),
  (theme.typography.h1 = {
    ...theme.typography.h1,
    [theme.breakpoints.between("laptop", "desktop")]: {
      fontSize: "32pt", //28
    },
  }),
  (theme.typography.h2 = {
    ...theme.typography.h2,
    [theme.breakpoints.between("laptop", "desktop")]: {
      fontSize: "22pt", //21.5
    },
  });

export { theme };
