import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    "name": "vishnu-vikas-portfolio",
    "compatibilityDate": "2026-10-01",
    "observability": {
      "enabled": true
    },
    "assets": {
      "notFoundHandling": "single-page-application"
    }
  }
});
