<template>
  <div class="stream-cell">
    <iframe class="stream" :src="'https://www.youtube.com/embed/'+options.channel+'?rel=0&amp;showinfo=0'" frameborder="0" allowfullscreen="true" scrolling="no" @load="onStreamLoad" allow="autoplay; encrypted-media"></iframe>
    <div class="chat-container" :style="[chatStyle, {width: chatHover?'50%':chatStyle.width} ]" v-if="options.openChat" @mouseenter="onHoverChat(true)" @mouseleave="onHoverChat(false)">
      <iframe :src="'https://www.youtube.com/live_chat?v='+options.channel+'&embed_domain=fsworld009.github.io'" frameborder="0" scrolling="no" allow="autoplay; encrypted-media"></iframe>
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

