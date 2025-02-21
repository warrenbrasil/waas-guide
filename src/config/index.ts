import { GlobalState } from "@/types";

export default {
  branding: {
    logo: '/guide/logo.svg',
    name: 'Guide',
    theme: {
      dark: {
        logo: '/guide/guide-logo-white.png',
        logoSize: 'h-8'
      },
      light: {
        logo: '/guide/guide-logo-black.png',
        logoSize: 'h-8'
      }
    }
  },
  theme: 'light',
  specs: {
    warp: '/guide/specs/warp.json',
    "swagger petstore - openapi 3.0": 'https://petstore3.swagger.io/api/v3/openapi.json',
    "spoonacular api": "https://spoonacular.com/application/frontend/downloads/spoonacular-openapi-3.json"
  },
  pages: ['/', '/search', '/pages/readme', '/pages/changelog']
} as GlobalState