import { createTheme, darken, lighten, responsiveFontSizes } from '@material-ui/core/styles';

const colors = {
  // primary: "#F24333", // orange
  // primary: "#BA1B1D",
  primary: "#840032",
  // secondary: "#01072c", // darker
  // primary: "#C31C1F", // lighter
  // secondary: "#01093B",
  secondary: "#1F1F1F",
};

let lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: lighten(colors.secondary, 0.95),
      paper: lighten(colors.secondary, 0.99),
    },
    text: {
      disabled: lighten(colors.secondary, 0.5),
    },
  },
  typography: {
    fontSize: 12,
  },
});
lightTheme.overrides = {
  MuiBottomNavigation: {
    root: {
      background: "none",
    },
  },
  MuiBottomNavigationAction: {
    root: {
      color: lightTheme.palette.text.primary,
      "&.Mui-selected": {
        color: lightTheme.palette.text.primary,
      },
    },
  },
};
lightTheme = responsiveFontSizes(lightTheme);

let darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: darken(colors.secondary, 0.7),
      paper: colors.secondary,
    },
    text: {
      disabled: darken(colors.secondary, 0.5),
    },
  },
  typography: {
    fontSize: 12,
  },
});
darkTheme.overrides = {
  MuiBottomNavigation: {
    root: {
      background: "none",
    },
  },
  MuiBottomNavigationAction: {
    root: {
      color: darkTheme.palette.common.white,
      "&.Mui-selected": {
        color: darkTheme.palette.common.white,
      },
    },
  },
};
darkTheme = responsiveFontSizes(darkTheme);

const theme = lightTheme;
// const theme = darkTheme;

export type AppTheme = typeof theme;

export { theme };
