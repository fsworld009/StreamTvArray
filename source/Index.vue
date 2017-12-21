<template>
  <div>
    <template v-if="loading">
      <div class="stream-col overlay-text stream-overlay">
      <!-- <i class="add circle icon inverted" :style="{fontSize: (100/height)+'vh'}"></i> -->
        <h1 class="text white"><i class=" spinner loading icon"></i></h1>
      </div>
    </template>
    <template v-else>
      <StreamContainer/>
      <template v-if="showOptions">
        <Options></Options>
      </template>
    </template>
  </div>
</template>

<script>
import Options from './components/Options.vue';
import StreamContainer from './components/StreamContainer.vue';
import {mapState, mapGetters} from 'vuex';
import {LOAD_LANG_LIST, LOAD_LANG} from './actions.js';
import {PAGE_LOADED} from './mutations.js';

export default {
  components: {
    Options,
    StreamContainer
  },
  
  data (){
    var state = this.$store.state;
    return {
      width: state.width,
      height: state.height,
      loading: true
    };
  },

  computed: mapGetters(['showOptions']),

  mounted(){

    //ajax calls on page load
    if(this.loading){
      var $langListDeferred = $.Deferred(), $langDeferred = $.Deferred();
      this.$store.dispatch({
        type: LOAD_LANG_LIST,
        callback: ()=>{
          $langListDeferred.resolve();
        }
      });
      this.$store.dispatch({
        type: LOAD_LANG,
        callback: ()=>{
         $langDeferred.resolve();
        }
      });
      $.when($langListDeferred, $langDeferred).then(()=>{
        this.loading = false;
      });
    }
  },

  
  methods: {
    
  }
};
</script>
