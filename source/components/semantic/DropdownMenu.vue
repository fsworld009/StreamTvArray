<template>
  <div class="ui pointing dropdown item">
    <i :class="'icon ' + options.iconClass" ></i>
    <div class="ui menu inverted blue tablet or lower only">
      <template v-for="(menu, index) in options.menuItems">
        <a  :key="index" :href="'javascript:void(0)'" :class="'item text '+(menu.color || 'white ')+(menu.disabled?'disabled ':' ')" :target="menu.target||''" @click="onClickMenuItem(menu.action)"><i :class="'icon '+menu.icon"></i> {{menu.text}}</a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      console.log("create", this.options)
      var $dropdown = $(this.$el);
      console.log("$dropdown",$dropdown)
      var options = Object.assign({
        "onShow" (){
          //disable selected classes as this dropdown serves as a menu
          $(this).find(".item.active.selected").removeClass("active selected");
        }
      }, this.options);
      $dropdown.dropdown(options);
    },
    destroy(){
      var $dropdown = $(this.$el);
      $dropdown.dropdown('destroy');
    },
    onClickMenuItem(actionName){
      this.$emit("click", this.options, actionName);
    }
  }
}
</script>
