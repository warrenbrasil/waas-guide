import { GlobalState } from "@/types";

export default {
  branding: {
    logo: '/logo.svg',
    name: 'Guide',
    theme: {
      dark: {
        logo: '/guide-logo-white.png',
        logoSize: 'h-8'
      },
      light: {
        logo: '/guide-logo-black.png',
        logoSize: 'h-8'
      }
    }
  },
  theme: 'light',
  specs: {
    warp: '/specs/warp.json',
    "swagger petstore - openapi 3.0": 'https://petstore3.swagger.io/api/v3/openapi.json',
    "spoonacular api": "https://spoonacular.com/application/frontend/downloads/spoonacular-openapi-3.json"
  },
  pages: ['/', '/search', '/pages/readme', '/pages/changelog']
} as GlobalState