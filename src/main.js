import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "aos/dist/aos.css";
import "./assets/styles/main.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
