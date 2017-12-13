<template>
  <div class="field">
    <label ><h5 v-if="label" v-html="label"></h5></label>
    <input class="ui input" :name="name" :value="value" :type="type"></input>
  </div>
</template>


<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {
      default: ""
    },
    options: {
      type: Object
    },
    type: {
      default: "text"
    },
    label: {

    }
  },
}
</script>
