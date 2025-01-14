export interface GlobalState {
  branding: {
    name: string;
    theme: {
      dark: {
        logo: string;
        logoSize: string;
      };
      light: {
        logo: string;
        logoSize: string;
      };
    };
  },
  theme: 'light' | 'dark';
  specs: {
    [key: string]: string;
  };
  pages: string[];
}