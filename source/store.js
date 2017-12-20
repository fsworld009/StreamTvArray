import Vuex from 'vuex';
import Vue from 'vue';
import VueLang from "./plugins/vue-lang.js";

Vue.use(Vuex);
// var _ = require("lodash");
import {RESET_ARRAY, UPDATE_STREAM, SHOW_ARRAY_OPTIONS, UPDATE_LANG, CHANGE_LANG_CODE} from "./mutations.js";
import {LOAD_LANG} from "./actions.js";


const sessionStorageKey = 'StreamTvArray';
var session = sessionStorage.getItem(sessionStorageKey) || "{}";

var initialState =  Object.assign({
    // sessionId: 1,
    width: 0,
    height: 0,
    streams: {},
    showOptionFlag: false,
    langCode: "en"
  //   savedSessions: []
  }, JSON.parse(session));


Object.keys(initialState.streams).forEach((streamId)=>{
    let streamOptions = initialState.streams[streamId];
    if(streamOptions.loading === false){
        streamOptions.loading = true;
}
});

var defaultLangCode = "en";

Vue.use(VueLang, {
    langCode: initialState.langCode,
    default: defaultLangCode
});




function saveSession(state){
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
}

function loadLang(langCode, commit){
    return $.getJSON("./languages/"+langCode+".json", function(messages){
        console.log("loaded", langCode, messages);
        commit({
            type: UPDATE_LANG,
            langCode: langCode,
            messages: messages
        });
    });
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
    actions:{
        [LOAD_LANG]({ commit, state }, payload){
            console.log(commit, state, payload);
            var $defaultLangPromise;
            
            if(!Vue.$lang.loaded(defaultLangCode)){
                $defaultLangPromise = loadLang(defaultLangCode, commit);
            }else{
                $defaultLangPromise = $.Deferred().resolve();
            }
            $defaultLangPromise.then(()=>{
                var langCode = payload.langCode || state.langCode;
                if(langCode && !Vue.$lang.loaded(langCode)){
                    return loadLang(langCode, commit);
                }else{
                    return $.Deferred().resolve();
                }
            }).then(()=>{
                console.log("resolved");
                if(typeof payload.callback == "function"){
                    payload.callback();
                }
            });
        }
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
      },

      [CHANGE_LANG_CODE](state, payload){
        state.langCode = payload.langCode;
        Vue.$lang.changeLangCode(payload.langCode);
        saveSession(state);
      },

      [UPDATE_LANG](state, payload){
        Vue.$lang.update(payload.langCode, payload.messages);
      }
    }
  });

  export default store;