
// var messageMap = {};
// var langCode = "en";

var VueLang = {
    __messageMap: {},
    __langCode: "en",

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

    install: function(Vue, options){
        options = options || {};
        if(options.messages){
            VueLang.__messageMap = Object.assign({}, options.messages);
        }

        if(options.langCode){
            VueLang.__langCode = options.langCode;
        }


        Vue.prototype.$lang = VueLang.__$lang();

        Vue.$lang = {
            changeLangCode: function(newLangCode){
                VueLang.__langCode = newLangCode;
                VueLang.__$forceUpdate(VueLang.__$root);
            },

            update: function(langCode, messages){
                VueLang.__messageMap[langCode] = messages;
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

export default VueLang;