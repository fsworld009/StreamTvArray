<template>
  <div class="stream-container">
    <template v-for="(streamRow, row) in streams">
      <div class="stream-row" :key="row">
        <template v-for="(stream, col) in streamRow" >

          <div class="stream-col" v-if="stream.channel" :key="col" :style="style">
            <component :is="'StreamTwitch'" :options="stream"  style="style"/>
            <div class="stream-menu">
              <div class="ui pointing dropdown top left item">
                <i class="big list layout icon blue" ></i>
                <div class="ui menu inverted blue tablet or lower only">
                  <template v-for="(menu, index) in menuItems">
                    <a  :key="index" :href="menu.link" class="item text white" :target="menu.target||''"><i :class="'icon '+menu.icon"></i> {{menu.text}}</a>
                  </template>
                </div>
              </div>
            </div>
          </div>
          
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
      for(h=0;h<state.height;h++){
        var colStreams = []; 
        for(w=0;w<state.width;w++){
          id = state.width==1? h: h*state.height + w;
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
