import { createApp } from 'vue'
import App from './App.vue';
import components from '@/components/UI/index.js';
import router from "@/router/router.js";
import VIntersection from "@/directives/VIntersection.js";
import directives from "@/directives/index.js";
import store from "@/store/index.js";

const app = createApp(App)

components.forEach((component) => {
    app.component(component.name, component);
});

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

app
    .use(router)
    .use(store)
    .mount('#app')

