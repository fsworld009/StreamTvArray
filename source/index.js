import Vue from 'vue';
import Index from './Index.vue';

require('./semantic/semantic.css');
require('./semantic/semantic.js');

new Vue({
    el: "#app",
    template: '<Index/>',
    components: {Index}
});

