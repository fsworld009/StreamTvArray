<template>
  <div class="field">
    <label ><h5 v-if="label" v-html="label"></h5></label>
    <div class="ui search fluid selection dropdown">
      <input :name="name" type="hidden" :value="value">
      <i class="dropdown icon"></i>
      <div class="default text">{{placeholder}}</div>
      <div class="menu">
        <template v-for="(item, index) in items">
          <div class="item" :key="index" :data-value="item.value">{{item.text}}</div>
        </template>
      </div>
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
    items: {
      type: Array,
      default(){return []}
    },
    placeholder: {
      
      default: ""
    },
    options: {
      type: Object
    },
    label: {

    }
  },
  mounted() {
    this.create();
  },
  updated(){
    this.destroy();
    this.create();
  },
  beforeDestroy(){
    this.destroy();
  }, 
  methods: {
    create(){
      var $dropdown = $(this.$el).find(".ui.dropdown");

      var options = Object.assign({
        
      }, this.options);
      $dropdown.dropdown(options);
    },
    destroy(){
      var $dropdown = $(this.$el).find(".ui.dropdown");
      $dropdown.dropdown('destroy');
    }
  },


}
</script>
