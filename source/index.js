window.onbeforeunload = function() { return "You are about to leave";};

import Vue from 'vue';
import Index from './Index.vue';
import store from './store.js';
import VueLang from "./plugins/vue-lang.js";

require('./semantic/semantic.css');
require('./semantic/semantic.js');
require('./index.css');

Vue.use(VueLang, {
    // langCode: "zh-TW",
    messages: {
        "en": {"hello": "Hello World {name}"},
        "zh-TW": {"hello": "你好世界 {name}"}
    }
});

new Vue({
    el: "#app",
    store,
    template: '<Index/>',
    components: {Index}
});
