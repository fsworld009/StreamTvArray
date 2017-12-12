<template>
  <Modal @close="onCloseModal" :options="options">
    {{options}}
  </Modal>
</template>

<script>
import Modal from './semantic/Modal.vue';

export default {
  props: ['options'],
  components: {
    Modal
  },

  methods: {
    onCloseModal(){
      this.$emit("close");
    }
  }
}
</script>

