<template>
  <div class="stream-menu">
    <DropdownMenu class="top left" :options="menuOptions" @click="onClickMenuItem"></DropdownMenu>
  </div>
</template>

<script>
import DropdownMenu from "./semantic/DropdownMenu.vue";
export default {
  components: {
    DropdownMenu
  },
  props: {
    options: {
      type: Object
    }
  },
  computed: {
    menuOptions(){
      return {
        iconClass: "big list blue",
        menuItems:[
          {icon: "comment", text: this.$lang("stream.toggleChat"), action:"toggleChat", disabled: !this.options.openChat},
          {icon: "move", text: this.$lang("stream.moveStream"), action:"moveStream"},
          {icon: "setting", text: this.$lang("stream.streamOptions"), action:"streamOptions"},
          {icon: "puzzle", text: this.$lang("stream.arrayOptions"), action:"arrayOptions"},
          {color: "yellow", icon: "remove", text: this.$lang("stream.closeStream"), action:"closeStream"}
        ]
      };
    }
  },

  methods: {
    onClickMenuItem(menuOptions, actionName){
      this.$emit("select", this.options, actionName);
    }
  }
}
</script>
