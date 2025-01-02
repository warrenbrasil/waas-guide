export interface GlobalState {
  branding: {
    name: string;
    theme: {
      dark: {
        logo: string;
      };
      light: {
        logo: string;
      };
    };
  },
  theme: 'light' | 'dark';
  specs: {
    [key: string]: string;
  };
  pages: string[];
}