import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
// var _ = require("lodash");
import {RESET_ARRAY, UPDATE_STREAM, SHOW_ARRAY_OPTIONS} from "./mutations.js";


const sessionStorageKey = 'StreamTvArray';
var session = sessionStorage.getItem(sessionStorageKey) || "{}";

var initialState =  Object.assign({
    // sessionId: 1,
    width: 0,
    height: 0,
    streams: {},
    showOptionFlag: false
  //   savedSessions: []
  }, JSON.parse(session));

  Object.keys(initialState.streams).forEach((streamId)=>{
    let streamOptions = initialState.streams[streamId];
    if(streamOptions.loading === false){
        streamOptions.loading = true;
    }
  });

function saveSession(state){
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
}

const store = new Vuex.Store({
    state: initialState,
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
        if(payload.width && payload.height){
            state.width = Number(payload.width);
            state.height = Number(payload.height);
        }

        state.showOptionFlag = false;

        for(let i=0; i< state.width*state.height; i++){
            if(!state.streams[i]){
                Vue.set(state.streams, i, {
                    id: i
                });
            }
        }

        saveSession(state);

      },
      [UPDATE_STREAM](state, payload){
          var options = payload.options;
          var id = payload.id;
        state.streams[id] = Object.assign({}, state.streams[id], options);
        saveSession(state);
      },
      [SHOW_ARRAY_OPTIONS](state, payload){
        state.showOptionFlag = true;
        saveSession(state);
      }
    }
  });

  export default store;