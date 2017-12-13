<template>
  <div class="field">
    <label ><h5 v-if="label" v-html="label"></h5></label>
    <div class="ui checkbox">
      <input type="checkbox" :name="name" :value="value" v-model="compChecked">
      <label><slot></slot></label>
    </div>
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
    checked: {
      default: false
    },
    label: {

    }
  },
  data(){
    return {
      compChecked: this.checked
    }
  },
  mounted() {
    // this.create();
  },
  updated(){
    // this.destroy();
    // this.create();
  },
  beforeDestroy(){
    // this.destroy();
  }, 
  methods: {
    create(){
      var $checkbox = $(this.$el).find(".ui.checkbox");

      var options = Object.assign({
        
      }, this.options);
      $checkbox.checkbox(options);
    },
    destroy(){
      var $checkbox = $(this.$el).find(".ui.checkbox");
      $checkbox.checkbox('destroy');
    }
  },
}
</script>
