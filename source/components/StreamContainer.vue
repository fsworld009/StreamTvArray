<template>
  <div class="stream-container">
    <template v-for="(streamRow, row) in streams">
      <div class="stream-row" :key="row">
        <template v-for="(stream, col) in streamRow" >
          <component :is="'StreamTwitch'" :key="col" v-if="stream.channel" :style="style"/>
          
          <div class="stream-col add-icon" :key="col" v-else :style="style" @click="openStreamOptions(stream)">
            <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i>
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

export default {
  components: {
    StreamOptions,
    StreamTwitch
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
      console.log("state",state)
      for(h=0;h<state.height;h++){
        var colStreams = []; 
        for(w=0;w<state.width;w++){
          id = h*state.height + w;
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
    }
  }
}
</script>
