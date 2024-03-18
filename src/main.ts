import "./style.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
//import "vuetify/styles";
import "vuetify/dist/vuetify.min.css"
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
.use(createPinia())
.use(router)
.use(vuetify)
.mount("#app");
