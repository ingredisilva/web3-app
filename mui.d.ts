import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    chipPalette: {
      primary: {
        main: string;
        contrastText: string;
      };
      warning: {
        main: string;
        contrastText: string;
      };
      success: {
        main: string;
        contrastText: string;
      };
      error: {
        main: string;
        contrastText: string;
      };
      gray: {
        main: string;
        contrastText: string;
      };
    };
  }
}
