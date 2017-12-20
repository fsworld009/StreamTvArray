
// var messageMap = {};
// var langCode = "en";

var VueLang = {
    __messageMap: {},
    __langCode: "en",
    __defaultLangCode: "en",

    __$lang: function(){
        var $lang = function(messageId, substitutions){
            messageId = String(messageId);
            var messages = VueLang.__messageMap[VueLang.__langCode];
            if(!messages){
                return "";
            }
            var returnMsg="";

            if(messages[messageId]){
                returnMsg = messages[messageId];
            }else{
                var messageIdPath = messageId.split(".");
                returnMsg = messageIdPath.reduce(function(messageMap, nextMsgId){
                    if(typeof messageMap == "object"){
                        return messageMap[nextMsgId];
                    }else{
                        return messageMap;
                    }
                }, messages);
            }

            returnMsg = String(returnMsg);

            if(substitutions){
                returnMsg = returnMsg.replace(/\{([A-Za-z0-9]+)\}/g, function(match, $1){
                    if(substitutions[$1]){
                        return substitutions[$1];
                    }else{
                        return match;
                    }
                });
            }

            return returnMsg;
        };

        $lang.langCode = function(){
            return VueLang.__langCode;
        };

        return $lang;
    },

    processMessages: function(returnMsgObj, currentMsgObj, prefixes){
        var keys = Object.keys(currentMsgObj);
        var msgPrefix = prefixes.join(".");
        for(var i=0;i<keys.length;i++){
            var key = keys[i];
            var message = currentMsgObj[key];
            if(typeof message == "object"){
                prefixes.push(key);
                VueLang.processMessages(returnMsgObj, message, prefixes);
                prefixes.pop();
            }else{
                returnMsgObj[msgPrefix + "." + key] = message;
            }
        }
    },

    install: function(Vue, options){
        options = options || {};
        if(options.messages){
            VueLang.__messageMap = Object.assign({}, options.messages);
        }

        if(options.langCode){
            VueLang.__langCode = options.langCode;
        }

        if(options.default){
            VueLang.__defaultLangCode = options.default;
        }

        Vue.prototype.$lang = VueLang.__$lang();


        Vue.$lang = {
            changeLangCode: function(newLangCode){
                VueLang.__langCode = newLangCode;
                VueLang.__$forceUpdate(VueLang.__$root);
            },

            update: function(langCode, messages){
                var returnMsg = {};
                VueLang.processMessages(returnMsg, messages, []);
                VueLang.__messageMap[langCode] = Object.assign({}, VueLang.__messageMap[VueLang.__defaultLangCode], returnMsg);
            },

            loaded: function(langCode){
                return VueLang.__messageMap[langCode]? true: false;
            }
        };

    },

    __$forceUpdate: function(vm){
        vm.$forceUpdate();
        for(var i=0; i< vm.$children.length; i++){
            this.__$forceUpdate(vm.$children[i]);
        }
    },

    __$root: undefined,

    setAppRoot: function($root){
        this.__$root = $root;
    }
};

console.log("VueLang",VueLang);
export default VueLang;