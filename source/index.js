window.onbeforeunload = function() { return "You are about to leave";};

import Vue from 'vue';
import Index from './Index.vue';
import store from './store.js';
import VueLang from "./plugins/vue-lang.js";

require('./semantic/semantic.css');
require('./semantic/semantic.js');
require('./index.css');

Vue.use(VueLang, {
    messages: {
        "en": {"hello": {"world":"Hello World {name}"}}
    }
});

new Vue({
    el: "#app",
    store,
    template: '<Index/>',
    components: {Index}
});
