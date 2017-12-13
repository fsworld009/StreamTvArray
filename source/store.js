import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
var _ = require("lodash");
import {RESET_ARRAY, UPDATE_STREAM, SHOW_ARRAY_OPTIONS} from "./mutations.js";

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

        state.showOptionFlag = false;

        for(let i=0; i< state.width*state.height; i++){
            if(!state.streams[i]){
                Vue.set(state.streams, i, {
                    id: i
                });
            }
        }

      },
      [UPDATE_STREAM](state, payload){
          console.log(UPDATE_STREAM, payload);
          var options = payload.options;
          var id = options.id;
        //   Vue.set(state.streams, id, Object.assign({showChat: true}, state.streams[id], options));
        state.streams[id] = Object.assign({showChat: true}, state.streams[id], options);
      },
      [SHOW_ARRAY_OPTIONS](state, payload){
        state.showOptionFlag = true;
      }
    }
  });

  export default store;