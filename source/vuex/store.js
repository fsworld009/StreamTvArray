import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
var _ = require("lodash");
import {RESET_ARRAY} from "./mutations.js";

const store = new Vuex.Store({
    state: {
      sessionId: 1,
      width: 0,
      height: 0,
      streams: {},
      showOptionFlag: false
    //   savedSessions: []
    },
    getters: {
        showOptions(state){
            return state.showOptionFlag || (state.width==0 && state.height==0);
        }
    //   savedSessionsById(state){
    //     return _.keyBy(state.savedSessions, "id");
    //   }
    },
    mutations: {
      [RESET_ARRAY](state, payload){
        state.width = Number(payload.width);
        state.height = Number(payload.height);
      }
    }
  });

  export default store;