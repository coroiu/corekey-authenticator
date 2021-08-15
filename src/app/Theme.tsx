import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

theme = responsiveFontSizes(theme);

export type AppTheme = typeof theme;

export { theme };
