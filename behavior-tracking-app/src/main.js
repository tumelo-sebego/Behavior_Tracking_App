import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./registerServiceWorker";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

const app = createApp(App);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.use(router);
app.use(createPinia());
app.mount("#app");
