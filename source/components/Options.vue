<template>
  <Modal :options="modalOptions" @close="onCloseArrayOptionsModal">
    
      <div class="ui grid">
        <div class="two column row">
          <div class="column">
            <SeForm :validation="validationOptions">
              <h5 class="ui dividing header">Array Size</h5>
              <div class="fields">
              <SeInput class="four wide" name="width" :value="width" size="2" label=""/>  
              <div class="one wide field"><div style="position:relative;top:35%">x</div></div>
              <SeInput class="four wide" name="height" :value="height" size="2" label=""/>
              </div>
              <SeButton class="green" @click="changeArraySize">Apply</SeButton>
            </SeForm>
          </div>
          <div class="column">
            <h5 class="ui dividing header">Change log</h5>
            12.13.2017: First version
            <!-- <h5 class="ui dividing header">Load Sessions</h5>
            <div class="ui grid">
              <div class="thirteen wide column">
                <Dropdown name="session" :items="savedSessionsTest" placeholder="Select Session"/>
              </div>
              <div class="one wide column"><SeButton class="green load-session">Load</SeButton></div>
            </div> -->
          </div>

        </div>
      </div>

      <div class="ui divider"></div>
      <div class="ui">
        by <a href="https://github.com/fsworld009/" target="_blank">fsworld009</a>
        <i class="ui large icon github"></i><a href="https://github.com/fsworld009/StreamTvArray" target="_blank">Project GitHub</a>
        <i class="ui large icon warning circle"></i><a href="https://github.com/fsworld009/StreamTvArray/issues/" target="_blank">Report issues</a>
      </div> 
      

  </Modal>
</template>

<<style scoped>
/* .ui.form input[type="text"][name="width"], .ui.form input[type="text"][name="height"]{
  width: 50px;
} */
</style>


<script>
import {mapState} from 'vuex';
import Modal from './semantic/Modal.vue';
import SeForm from './semantic/Form.vue';
import Segment from './semantic/Segment.vue';
import SeButton from './semantic/Button.vue';
import SeInput from './semantic/Input.vue';
import Dropdown from './semantic/Dropdown.vue';
var _ = require("lodash");
import {RESET_ARRAY} from '../mutations.js';

export default {
  components: {
    Modal,
    SeForm,
    Segment,
    SeInput,
    SeButton,
    Dropdown
  },
  data(){
    return {
      validationOptions: {
        fields: {
          width: 'regExp[/[1-9][0-9]*/]',
          height: 'regExp[/[1-9][0-9]*/]'
        }
      }
    }
  },
  computed: mapState({
    // showSaveLoadSection(state){
    //   return state.savedSessions.length > 0;
    // },
    width(state){
      return state.width==0? 2: state.width;
    },
    height(state){
      return state.height==0? 2: state.height;
    },
    savedSessionsTest(state){
      return [
        {text:"[2x2] ch1...,ch2...,ch3...,ch4...", value: 1},
        {text:"[1x3] ch1...,ch2...,ch3", value: 2}
      ];
      
    },

    modalOptions(state){
      var closeble = state.width != 0 && state.height != 0;
      return {
        title: "Stream TV Array",
        closable: closeble,
        closeIcon: closeble
      };
    }
  }),

  methods: {
    changeArraySize(event){
      //validation?
      var $el = $(this.$el);
      var data = {};

      var $form = $el.find('form');

      if($form.form('is valid')){
        $form.find('input, textarea, select').each(function(i, field) {
          data[field.name] = field.value;
        });

        this.$store.commit(
          {
            type: RESET_ARRAY,
            width: data.width,
            height: data.height
          }
        );
        $el.modal('hide');
      }
    },
    onCloseArrayOptionsModal(){
      //cancel array options
      //set showOptionsFlag
      this.$store.commit(
        {
          type: RESET_ARRAY
        }
      );
    }
  }
}
</script>
