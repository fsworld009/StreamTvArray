<template>
  <div class="stream-cell">
    <iframe class="stream" :src="'https://embed.twitch.tv/?layout=video&parent='+host+'&channel='+options.channel" frameborder="0" allowfullscreen="true" scrolling="no" @load="onStreamLoad"></iframe>
    <div class="chat-container" :style="[chatStyle, {width: chatHover?'50%':chatStyle.width} ]" v-if="options.openChat" @mouseenter="onHoverChat(true)" @mouseleave="onHoverChat(false)">
      <iframe :src="'https://www.twitch.tv/embed/'+options.channel+'/chat?parent='+host+'&darkpopout'" frameborder="0" scrolling="no"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    options:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      host: location.hostname,
      chatHover: false
    }
  },
  computed: {
    chatStyle(){
      return {
        opacity: this.options.chatOpacity? (this.options.chatOpacity/100) : 0,
        display: this.options.showChat? "block" : "none",
        [this.options.chatPosition]: 0,
        width: this.options.chatWidth + "%"
      }
    }
  },
  methods: {
    onStreamLoad(){
      this.$emit("streamLoad", this.options);
    },
    onHoverChat(hovered){
      this.chatHover = hovered && this.options.chatExpandOnHover;
    }
  }
}
</script>

