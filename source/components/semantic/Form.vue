<template>
  <form class="ui form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    validation: {
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
      var $form = $(this.$el);

      if(this.validation){
        console.log("init validation")
        $form.form(Object.assign({
          on: 'blur'
        }, this.validation));
      }
    },
    destroy(){
      var $form = $(this.$el);
      $form.form('destroy');
    }
  }
}
</script>

