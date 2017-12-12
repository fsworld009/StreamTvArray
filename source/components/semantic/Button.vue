<template>
  <button class="ui button" type="button" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  methods: {
    onClick(event){
      this.$emit("click");
    }
  }
}
</script>
