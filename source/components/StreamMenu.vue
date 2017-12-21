<template>
  <div class="stream-menu">
    <div class="ui pointing dropdown top left item">
      <i class="big list layout icon blue" ></i>
      <div class="ui menu inverted blue tablet or lower only">
        <template v-for="(menu, index) in menuItems">
          <a  :key="index" :href="'javascript:void(0)'" :class="'item text '+(menu.color || 'white ')+(menu.disabled?'disabled ':' ')" :target="menu.target||''" @click="emit(menu.action)"><i :class="'icon '+menu.icon"></i> {{menu.text}}</a>
        </template>
      </div>
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
  data() {
    return {
      menuItems:[
        {icon: "comment", text: this.$lang("stream.toggleChat"), action:"toggleChat", disabled: !this.options.openChat},
        {icon: "setting", text: this.$lang("stream.streamOptions"), action:"streamOptions"},
        {icon: "puzzle", text: this.$lang("stream.arrayOptions"), action:"arrayOptions"},
        {color: "yellow", icon: "remove", text: this.$lang("stream.closeStream"), action:"closeStream"}
      ]
    };
  },
  mounted(){
    $(this.$el).find(".ui.dropdown").dropdown({
        "onShow" (){
          //disable selected classes as this dropdown serves as a menu
          $(this).find(".item.active.selected").removeClass("active selected");
        }
      });
  },

  beforeDestroy(){
    $(this.$el).find(".ui.dropdown").dropdown('destroy')
  },

  create(){

  },

  destroy(){

  },

  methods: {
    emit(actionName){
      this.$emit("select", this.options, actionName);
    }
  }
}
</script>
