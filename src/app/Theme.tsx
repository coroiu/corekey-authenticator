import { createTheme, darken, lighten, responsiveFontSizes } from '@material-ui/core/styles';

const colors = {
  primary: "#FB8500",
  secondary: "#023047",
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
      default: darken(colors.secondary, 0.6),
      paper: darken(colors.secondary, 0.2),
    },
    text: {
      disabled: darken(colors.secondary, 0.5),
    },
  },
  typography: {
    fontSize: 12,
  },
});
darkTheme = responsiveFontSizes(darkTheme);

const theme = lightTheme;
// const theme = darkTheme;

export type AppTheme = typeof theme;

export { theme };
