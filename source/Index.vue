<template>
  <div>
    <template v-if="loading">

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
import {LOAD_LANG} from './actions.js';
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
      this.$store.dispatch({
        type: LOAD_LANG,
        callback: ()=>{
          this.loading = false;
        }
      });
    }
  },

  
  methods: {
    
  }
};
</script>
