import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createTheme();

theme = responsiveFontSizes(theme);

export type AppTheme = typeof theme;

export { theme };
