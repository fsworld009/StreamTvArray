<template>
  <div class="stream-menu">
    <div class="ui pointing dropdown top left item">
      <i class="big list layout icon blue" ></i>
      <div class="ui menu inverted blue tablet or lower only">
        <template v-for="(menu, index) in menuItems">
          <a  :key="index" :href="'javascript:void(0)'" class="item text white" :target="menu.target||''"><i :class="'icon '+menu.icon"></i> {{menu.text}}</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuItems: [
        {icon: "info", text: "test"},
        {icon: "info", text: "test2"}
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
    (this.$el).find(".ui.dropdown").dropdown('destroy')
  }
}
</script>
