import { GlobalState } from "@/types";

export default {
  branding: {
    logo: '/logo.svg',
    name: 'WaaS',
    theme: {
      dark: {
        logo: '/warren-white.svg',
        logoSize: 'h-5'
      },
      light: {
        logo: '/warren-carvao.svg',
        logoSize: 'h-5'
      }
    }
  },
  theme: 'dark',
  specs: {
    onboarding: '/specs/onboarding.json',
    transactions: '/specs/transactions.json',
    account_rendering: '/specs/account-rendering.json',
    portfolios: '/specs/portfolios.json'
  },
  pages: ['/', '/search', '/pages/changelog', '/pages/authentication', '/pages/onboarding', '/pages/account-rendering', '/pages/portfolios', '/pages/transactions']
} as GlobalState