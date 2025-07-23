import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from "./App.vue";

import "./styles/style.css";
import "./styles/index.scss";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");
