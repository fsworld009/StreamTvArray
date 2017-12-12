<template>
  <div class="stream-menu">
    <div class="ui pointing dropdown top left item">
      <i class="big list layout icon blue" ></i>
      <div class="ui menu inverted blue tablet or lower only">
        <template v-for="(menu, index) in menuItems">
          <a  :key="index" :href="'javascript:void(0)'" class="item text white" :target="menu.target||''" @click="emit(menu.action)"><i :class="'icon '+menu.icon"></i> {{menu.text}}</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stream: {
      type: Object
    }
  },
  data(){
    return {
      
      menuItems: [
        {icon: "comment", text: "Toggle Chat", action:"toggleChat"},
        {icon: "setting", text: "Stream Options", action:"streamOptions"},
        {icon: "puzzle", text: "Array Options", action:"arrayOptions"}
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

  methods: {
    emit(actionName){
      this.$emit("select", this.stream, actionName);
    }
  }
}
</script>
