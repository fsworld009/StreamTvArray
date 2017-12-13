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
          <SeCheckbox name="openChat" :checked="(typeof options.openChat === 'undefined'? true: options.openChat)">Open Chat</SeCheckbox>
        </div>
        <div class="fourteen wide field">
          <Label><h5>Chat Transparency (0~100)</h5></Label>
          <SeInput name="transparency" :value="transparency"></SeInput>
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
    transparency(){
      return this.options.chatOpacity ? 100 - this.options.chatOpacity : 50;
    }
  },

  methods: {
    onCloseModal(){
      this.$emit("close");
    },
    applyOption(){
      var $el = $(this.$el);
      var data = {};
      $el.find('form').find('input, textarea').each(function(i, input) {
        var $input = $(input);
        var inputType = $(this).attr("type");
        var name = $input.attr("name");
        var value = $input.val();
        if(inputType != "checkbox" && inputType != "radio"){
          if(name){
            data[name] = value;
          }
        }else if(inputType == "checkbox"){
            data[name] = $input.prop("checked");
        }
      });
      $el.find('form').find('input:checked').each(function(i, field) {
        data[field.name] = field.value || true;
      });

      var options = Object.assign({
        showChat: true
      }, this.options, data, {
        loading: this.options.channel != data.channel
      });

      // transparency to opacity
      data.transparency = data.transparency || 0;
      options.chatOpacity = 100 - data.transparency;
      delete data.transparency;

      //set showChat flag to true to reduce confusion when re-enable openChat flag
      if(options.showChat === false){
        options.showChat = true;
      }

      this.$store.commit({
        type: UPDATE_STREAM,
        id: this.options.id,
        options: options
      })
      this.$emit("close");
    }
  }
}
</script>

