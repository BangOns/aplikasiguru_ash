import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons";

const app = createApp(App);
const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);
app.component("v-icon", OhVueIcon);
app.use(router);
app.mount("#app");
