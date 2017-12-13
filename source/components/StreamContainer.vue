<template>
  <div class="stream-container">
    <template v-for="(streamRow, row) in streams">
      <div class="stream-row" :key="row">
        <template v-for="(stream, col) in streamRow" >

          <div class="stream-col" v-if="stream.channel" :key="col" :style="style">
            <div class="stream-col overlay-text stream-overlay" :style="style" v-if="stream.loading">
            <!-- <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i> -->
              <h1 class="text white"><i class=" spinner loading icon"></i></h1>
            </div>
            <component :is="'StreamTwitch'" :options="stream"  style="style" @streamLoad="onStreamLoad"/>
            <StreamMenu @select="onSelectMenu" :stream="stream"/>
          </div>
          
          <div class="stream-col overlay-text open-stream-overlay" :key="col" v-else :style="style" @click="openStreamOptions(stream)">
            <!-- <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i> -->
            <h1 class="text white">Open Stream</h1>
          </div>
        </template>
      </div>
    </template>
    <StreamOptions v-if="streamOptions !== null" :options="streamOptions" @close="onCloseOptionsModal"></StreamOptions>

  </div>

</template>


<script>
import {mapState} from 'vuex';
import StreamTwitch from './StreamTwitch.vue';
import StreamOptions from './StreamOptions.vue';
import StreamMenu from './StreamMenu.vue';
import {UPDATE_STREAM, SHOW_ARRAY_OPTIONS} from '../mutations.js';

export default {
  components: {
    StreamOptions,
    StreamTwitch,
    StreamMenu
  },
  data(){
    return {
      streamOptions: null
      
    }
  },
  computed: mapState({
    width(state){
      return state.width;
    },
    height(state){
      return state.height;
    },
    streams(state){
      //restructure streams object into nested presentation
      var w,h,id=0;
      var streams=[];
      for(h=0;h<state.height;h++){
        var colStreams = []; 
        for(w=0;w<state.width;w++){
          id = h*state.width + w;
          console.log("id",id,w,h)
          colStreams.push(state.streams[id]);
        }
        streams.push(colStreams);
      }
      return streams;
    },
    style(state){
      return {
        width: (100/state.width)+'vw',
        height: (100/state.height)+'vh',
      }
    }
  }),
  methods: {
    openStreamOptions(streamOptions){
      this.streamOptions = streamOptions;
    },
    onCloseOptionsModal(){
      this.streamOptions = null;
    },
    onSelectMenu(stream, action){
      console.log("select",stream, action, stream.id)
      switch(action){
        case "toggleChat":
          this.$store.commit({
            type: UPDATE_STREAM,
            id: stream.id,
            options: {
              showChat: !stream.showChat
            }
          })
          break;
        case "streamOptions":
          this.streamOptions = stream;
          break;
        case "arrayOptions":
          this.$store.commit(SHOW_ARRAY_OPTIONS);
          break;
      }
    },
    onStreamLoad(stream){
      console.log("onStreamLoad",stream);
      this.$store.commit({
        type: UPDATE_STREAM,
        id: stream.id,
        options: {
          loading: false
        }
      })
    }
  }
}
</script>
