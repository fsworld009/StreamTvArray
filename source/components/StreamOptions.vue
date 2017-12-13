<template>
  <Modal @close="onCloseModal" :options="modalOptions">
    <SeForm :validation="validationOptions">
      <div class="fields">
        <Dropdown class="four wide" name="site" :items="sites" :value="options.site || 'twitch'" label="Site"></Dropdown>
        <SeInput class="twelve wide" name="channel" :value="options.channel" label="Channel ID"></SeInput>
      </div>
      <div class="fields">
        <SeCheckbox class="four wide" name="openChat" :checked="(typeof options.openChat === 'undefined'? true: options.openChat)" label="&nbsp;">Open Chat</SeCheckbox>
        <SeInput class="twelve wide" name="transparency" :value="transparency" label="Chat Transparency (0~100)"></SeInput>
      </div>
      <div class="text violet"><i class="ui icon info circle large"></i> You can access options menu by clicking  <i class="large list layout icon blue" ></i> icon on top left hand side of the stream</div>
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
        title: this.options.channel? "Stream Options" : "Open Stream",
        actions: [
          {text: this.options.channel? "Apply" : "Open", styleClasses: "green", action: this.applyOption.bind(this)},
          {text: "Cancel", styleClasses: "red cancel"}
        ]
      },
      validationOptions: {
        fields: {
          channel: 'empty',
          site: 'empty',
          transparency: 'integer[0..100]'
        }
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

      var $form =  $el.find('form');
      $form.form("validate form");  //force UI update
      if($form.form("is valid")){
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
}
</script>

