<template>
  <div class="field">
    <label ><h5 v-if="label" v-html="label"></h5></label>
    <div :class="'ui ' + (typeof suffix != 'undefined'? 'right labeled ':' ') + ' input ' + (disabled?'disabled ':' ')">
      <input :class="(disabled?'disabled ':' ')" :name="name" :value="value" :type="type" :placeholder="placeholder"/>
      <div v-if="typeof suffix != 'undefined'" class="ui basic label" v-html="suffix"></div>
    </div>
<!-- 

    <template v-if="typeof suffix != 'undefined'">
     
    </template>
    <template v-else>
      <div :class="'ui input ' + (disabled?'disabled ':' ')">
        <input :name="name" :value="value" :type="type" :placeholder="placeholder"/>
      </div>
    </template> -->
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

    },
    placeholder: {

    },
    suffix: {},
    disabled:{}
  },
}
</script>
