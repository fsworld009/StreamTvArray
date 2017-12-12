<template>
  <div class="stream-cell">
    <iframe class="stream" :src="'https://player.twitch.tv/?channel='+options.channel" frameborder="0" allowfullscreen="true" scrolling="no" ></iframe>
        <div class="chat-container" v-if="options.showChat">
          <iframe :src="'https://www.twitch.tv/'+options.channel+'/chat?popout=true'" frameborder="0" scrolling="no" ></iframe>
        </div>
        <div class="stream-overlay">

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
  }
}
</script>

