import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
var _ = require("lodash");

const store = new Vuex.Store({
    state: {
      sessionId: 1,
      width: 0,
      height: 0,
      streams: [],
      savedSessions: []
    },
    getters: {
      savedSessionsById(state){
        return _.keyBy(state.savedSessions, "id");
      }
    },
    mutations: {
      increment (state) {
        state.count++;
      }
    }
  });

  export default store;