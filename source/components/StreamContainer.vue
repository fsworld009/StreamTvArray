<template>
  <div class="stream-container">
    <template v-for="(streamRow, row) in streams">
      <div class="stream-row" :key="row">
        <template v-for="stream in streamRow">
          <div :class="'stream-col '" :key="stream.id" :style="streamColStyle">
            <div v-if="stream.channel">
              <div class="stream-col overlay-text stream-overlay stream-loading" :style="streamColStyle" v-if="streamLoading[stream.id]">
              <!-- <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i> -->
                <h1 class="text white"><i class=" spinner loading icon"></i></h1>
              </div>
              <component :is="'StreamTwitch'" :options="stream"  :style="streamColStyle" @streamLoad="onStreamLoad"/>
              <StreamMenu @select="onSelectMenu" :options="stream" v-if="!movingStream" />
            </div>
            
            <div class="stream-col overlay-text open-stream-overlay" v-else-if="!movingStream" :style="streamColStyle" @click="openStreamOptions(stream)">
              <!-- <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i> -->
              <h1 class="text white">{{$lang("stream.openStream")}}</h1>
            </div>

            <div class="stream-col overlay-text stream-overlay move-candidate" :style="streamColStyle" v-if="movingStream" @click="moveStream(stream)">
              <!-- <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i> -->
              <h1 class="text white">{{$lang('stream.moveHere')}}</h1>
            </div>

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
import {UPDATE_STREAM, SHOW_ARRAY_OPTIONS, SWAP_STREAM_ORDER} from '../mutations.js';

export default {
  components: {
    StreamOptions,
    StreamTwitch,
    StreamMenu
  },
  data(){
    var data = {
      streamOptions: null,
      movingStream: null
    }
    data.streamLoading = function(state){
      var streamIds = Object.keys(state.streams);
      var loadingMap={};
      for(var i=0;i<streamIds.length;i++){
        var streamId = streamIds[i];
        loadingMap[streamId] = state.streams[streamId].channel? true: false
      };
      return loadingMap;
    }(this.$store.state);
    return data;
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
      var w,h,order=0;

      var streamIds = Object.keys(state.streams);
      var streamOptions=[];
      for(var i=0;i<streamIds.length;i++){
        streamOptions.push(state.streams[streamIds[i]]);
      }

      streamOptions.sort((streamOption1, streamOption2)=>{
        return streamOption1.order > streamOption2.order? 1 : -1;
      })

      var renderedStreamList=[];
      for(h=0;h<state.height;h++){
        var colStreams = []; 
        for(w=0;w<state.width;w++){
          order = h*state.width + w;
          colStreams.push(streamOptions[order]);
        }
        renderedStreamList.push(colStreams);
      }
      return renderedStreamList;
    },
    streamColStyle(state){
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
    onCloseOptionsModal(reloadFlag){
      if(reloadFlag){
        this.streamLoading[this.streamOptions.id] = true;
      }
      this.streamOptions = null;
    },
    onSelectMenu(streamOptions, action){
      switch(action){
        case "toggleChat":
          this.$store.commit({
            type: UPDATE_STREAM,
            id: streamOptions.id,
            options: {
              showChat: !streamOptions.showChat
            }
          })
          break;
        case "streamOptions":
          this.streamOptions = streamOptions;
          break;
        case "arrayOptions":
          this.$store.commit(SHOW_ARRAY_OPTIONS);
          break;
        case "closeStream":
          this.$store.commit({
            type: UPDATE_STREAM,
            id: streamOptions.id,
            options: {
              channel: ""
            }
          });
          break;
        case "moveStream":
          this.movingStream = streamOptions;
          break;
      }
    },
    onStreamLoad(streamOptions){
      this.streamLoading[streamOptions.id] = false;
    },
    moveStream(candidateStreamOptions){
      if(candidateStreamOptions != this.movingStream){

        //iframe will be reloaded on swap
        if(candidateStreamOptions.channel){
          this.streamLoading[candidateStreamOptions.id] = true;
        }
        if(this.movingStream.channel){
          this.streamLoading[this.movingStream.id] = true;
        }

        this.$store.commit({
          type: SWAP_STREAM_ORDER,
          ids: [this.movingStream.id, candidateStreamOptions.id]
        });

      }
      this.movingStream = null;
    }
  }
}
</script>
