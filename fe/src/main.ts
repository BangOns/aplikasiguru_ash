import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons";
import autoAnimate from "@formkit/auto-animate";

const app = createApp(App);
const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);
app.component("v-icon", OhVueIcon);
app.directive("auto-animate", (el) => autoAnimate(el));
app.use(router);
app.mount("#app");
