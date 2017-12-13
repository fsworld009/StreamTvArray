window.onbeforeunload = function() { return "You are about to leave";};

import Vue from 'vue';
import Index from './Index.vue';
import store from './store.js';

require('./semantic/semantic.css');
require('./semantic/semantic.js');
require('./index.css');

new Vue({
    el: "#app",
    store,
    template: '<Index/>',
    components: {Index}
});
