<template>
  <div>
    <StreamContainer/>
    <template v-if="showOptions">
      <Options></Options>
    </template>
  </div>
</template>

<script>
import Options from './components/Options.vue';
import StreamContainer from './components/StreamContainer.vue';
import {mapGetters} from 'vuex';

export default {
  components: {
    Options,
    StreamContainer
  },
  
  data (){
    var state = this.$store.state;
    return {
      width: state.width,
      height: state.height
    };
  },

  computed: mapGetters(['showOptions']),

  mounted(){
    
  },

  
  methods: {
    
  }
};
</script>
