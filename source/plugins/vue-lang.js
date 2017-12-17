
var messageMap = {};
var langCode = "en";

var VueLang = {
    install: function(Vue, options){
        options = options || {};
        if(options.messages){
            messageMap = Object.assign({}, options.messages);
        }

        if(options.langCode){
            langCode = options.langCode;
        }


        Vue.prototype.$lang = function(messageId, substitutions){
            messageId = String(messageId);
            var messages = messageMap[langCode];
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

        Vue.prototype.$lang.lang="!!!!!";

        Vue.prototype.$lang.changeLangCode = function(currLnagCode){
            langCode = currLangCode;
        };

        Vue.prototype.$lang.langCode = function(){
            return langCode;
        };

        Vue.$lang = {
            changeLangCode: function(newLangCode){
                langCode = newLangCode;
            },

            update: function(langCode, messages){
                messageMap[langCode] = messages;
            }
        };

    }
};

export default VueLang;