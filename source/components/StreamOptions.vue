<template>
  <Modal @close="onCloseModal" :options="modalOptions">
    <SeForm :validation="validationOptions">
      <div class="fields">
        <Dropdown class="four wide" name="site" :items="sites" :value="compOptions.site" :label="$lang('streamOptions.site')"></Dropdown>
        <SeInput class="twelve wide" name="channel" :value="compOptions.channel" :label="$lang('streamOptions.channelId')"></SeInput>
      </div>
      <div class="fields">
        <SeCheckbox class="sixteen wide" name="openChat" :checked="compOptions.openChat" label="">{{$lang('streamOptions.openChat')}}</SeCheckbox>
        
      </div>
      <div v-if="true">
        <div class="fields">
          <SeInput class="four wide" name="chatWidth" :value="compOptions.chatWidth" placeholder="0~50" :label="$lang('streamOptions.chatWidth')" suffix="%"></SeInput>
          <SeInput class="four wide" name="transparency" :value="compOptions.transparency" placeholder="0~100" :label="$lang('streamOptions.chatTransparency')" suffix="%"></SeInput>
          <Dropdown class="four wide" name="chatPosition" :items="chatPositionOptions" :value="compOptions.chatPosition" :label="$lang('streamOptions.chatPosition')"></Dropdown>
          <SeCheckbox class="four wide" name="chatExpandOnHover" :checked="compOptions.chatExpandOnHover" label="&nbsp;">{{$lang('streamOptions.chatExpandOnHover')}}</SeCheckbox>
        </div>
      </div>
      <div class="text violet"><i class="ui icon info circle large"></i> <span v-html="$lang('streamOptions.menuInfo', {icon: '<i class=\'large list layout icon blue\' ></i>'})"></span></div>
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
        title: this.$lang(this.options.channel?  "stream.streamOptions" : "stream.openStream"),
        actions: [
          {text: this.$lang(this.options.channel? "common.apply" : "common.open"), styleClasses: "green", action: this.applyOption.bind(this)},
          {text: this.$lang("common.cancel"), styleClasses: "red cancel"}
        ]
      },
      validationOptions: {
        fields: {
          channel: 'empty',
          site: 'empty',
          transparency: 'integer[0..100]',
          chatWidth: 'integer[0..50]'
        }
      },
      sites: [
        {text: "Twitch", value: "twitch"}
      ]
    }
  },

  computed: {
    compOptions(){
      var options = Object.assign({
        site: "Twitch",
        openChat: true,
        chatPosition: "right",
        chatExpandOnHover: false,
        chatWidth: 25
      }, this.options);

      options.transparency = this.options.chatOpacity ? 100 - this.options.chatOpacity : 50;

      return options;

    },
    chatPositionOptions(){
      return [
        {text: this.$lang('common.left'), value: "left"},
        {text: this.$lang('common.right'), value: "right"}
      ]
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
        }, this.options, data);

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

        var reloadFlag = this.options.channel != options.channel;
        this.$emit("close", reloadFlag);
      }
    }
  }
}
</script>

