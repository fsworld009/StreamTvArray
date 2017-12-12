<template>
  <Modal @close="onCloseModal" :options="modalOptions">
    <SeForm>
      <div class="fields">
        <div class="four wide field">
          <label for=""><h5>Site</h5></label>
          <Dropdown name="site" :items="sites" :value="options.site || 'twitch'"></Dropdown>
        </div>
        <div class="twelve wide field">
          <label for=""><h5>Channel ID</h5></label>
          <SeInput name="channel" :value="options.channel"></SeInput>
        </div>
      </div>
      <div class="fields">
        <div class="four wide field">
          <Label><h5>&nbsp</h5></Label>
          <SeCheckbox name="showChat" :checked="(typeof options.showChat === 'undefined'? true: showChat)">Show Chat</SeCheckbox>
        </div>
        <div class="twelve wide field">
          <Label><h5>Chat Transparency (0~100)</h5></Label>
          <SeInput name="chatOpacity" :value="options.chatOpacity || 0"></SeInput>
        </div>
      </div>
    </SeForm>
  </Modal>
</template>

<script>
import Modal from './semantic/Modal.vue';
import SeForm from './semantic/Form.vue';
import Dropdown from './semantic/Dropdown.vue';
import SeInput from './semantic/Input.vue';
import SeCheckbox from './semantic/Checkbox.vue';
import {UPDATE_STREAM} from '../mutations.js';

export default {
  props: {
    options: {
      type: Object
    }
  },
  components: {
    Modal,
    SeForm,
    Dropdown,
    SeInput,
    SeCheckbox
  },

  data(){
    return {
      modalOptions: {
        closeIcon: true,
        actions: [
          {text: this.options.channel? "Apply" : "Open", styleClasses: "green", action: this.applyOption.bind(this)},
          {text: "Close", styleClasses: "red cancel"}
        ]
      },
      sites: [
        {text: "Twitch", value: "twitch"}
      ]
    }
  },

  computed: {
  },

  methods: {
    onCloseModal(){
      this.$emit("close");
    },
    applyOption(){
      var $el = $(this.$el);
      var data = {};
      $el.find('form').find('input, textarea').each(function(i, field) {
        if($(this).attr("type") != "checkbox" && $(this).attr("type") != "radio"){
          if(field.name){
            data[field.name] = field.value;
          }
        }
      });
      $el.find('form').find('input:checked').each(function(i, field) {
        data[field.name] = field.value || true;
      });

      var options = Object.assign(this.options,data);


      this.$store.commit({
        type: UPDATE_STREAM,
        options: options
      })
      this.$emit("close");
    }
  }
}
</script>

