<template>
  <div class="stream-cell">
    <iframe class="stream" :src="'https://player.twitch.tv/?channel='+options.channel" frameborder="0" allowfullscreen="true" scrolling="no" @load="onStreamLoad"></iframe>
        <div class="chat-container" :style="chatStyle" v-if="options.openChat">
          <iframe :src="'https://www.twitch.tv/'+options.channel+'/chat?popout=true'" frameborder="0" scrolling="no"></iframe>
        </div>
        <!-- <div class="stream-overlay">

        </div> -->
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
  computed: {
    chatStyle(){
      return {
        opacity: this.options.chatOpacity? (this.options.chatOpacity/100) : 0,
        display: this.options.showChat? "block" : "none"
      }
    }
  },
  methods: {
    onStreamLoad(){
      this.$emit("streamLoad", this.options);
    }
  }
}
</script>

