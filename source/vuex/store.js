import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      sessionId: 1,
      width: 0,
      height: 0,
      streams: [],
      savedSessions: {}
    },
    mutations: {
      increment (state) {
        state.count++;
      }
    }
  });

  export default store;