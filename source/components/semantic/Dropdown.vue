<template>
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
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
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
      var $dropdown = $(this.$el);

      var options = Object.assign({
        
      }, this.options);
      $dropdown.dropdown(options);
    },
    destroy(){
      var $dropdown = $(this.$el);
      $dropdown.dropdown('destroy');
    }
  },


}
</script>
