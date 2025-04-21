import { createApp } from 'vue';
import App from '@views/modules/registration/Registration.vue';
import vMask from '@assets/directives/mask';
import '@assets/styles/main.scss';


const app = createApp(App);

app
    .directive('mask', vMask)
    .mount('#app');