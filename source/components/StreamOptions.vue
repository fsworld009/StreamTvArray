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
        <div class="field">
            <SeCheckbox name="show-chat" :checked="(typeof options.showChat === 'undefined'? true: showChat)">Show Chat</SeCheckbox>
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
          {text: "Apply", styleClasses: "green"},
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
    }
  }
}
</script>

