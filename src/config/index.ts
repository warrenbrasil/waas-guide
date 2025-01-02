import { GlobalState } from "@/types";

export default {
  branding: {
    logo: '/logo.svg',
    name: 'WaaS',
    theme: {
      dark: {
        logo: '/logo-white.svg'
      },
      light: {
        logo: '/logo-black.svg'
      }
    }
  },
  theme: 'light',
  specs: {
    warp: '/specs/warp.json',
    "swagger petstore - openapi 3.0": 'https://petstore3.swagger.io/api/v3/openapi.json',
    "spoonacular api": "https://spoonacular.com/application/frontend/downloads/spoonacular-openapi-3.json"
  },
  pages: ['/', '/search']
} as GlobalState