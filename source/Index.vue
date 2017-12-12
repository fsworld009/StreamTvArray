<template>
  <!-- <div class="stream-container">
    <div class="stream-row">
      <div class="stream-col">
        <iframe class="stream" src="https://player.twitch.tv/?channel=" frameborder="0" allowfullscreen="true" scrolling="no" ></iframe>
        <div class="chat-container">
          <iframe src="https://www.twitch.tv/__/chat?popout=" frameborder="0" scrolling="no" ></iframe>
        </div>
        <div class="stream-overlay">

        </div>
        <div class="stream-menu">
           <div class="ui pointing dropdown top left item">
            <i class="big list layout icon blue" ></i>
            <div class="ui menu inverted blue tablet or lower only">
              <template v-for="(menu, index) in menuItems">
                <a  :key="index" :href="menu.link" class="item text white" :target="menu.target||''"><i :class="'icon '+menu.icon"></i> {{menu.text}}</a>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="stream-col">
        <iframe class="stream" src="https://player.twitch.tv/?channel=" frameborder="0" allowfullscreen="true" scrolling="no" ></iframe>
      </div>
    </div>
        <div class="stream-row">
      <div class="stream-col">
        <iframe class="stream" src="https://player.twitch.tv/?channel=" frameborder="0" allowfullscreen="true" scrolling="no" ></iframe>
      </div>
      <div class="stream-col">
        <iframe class="stream" src="https://player.twitch.tv/?channel=" frameborder="0" allowfullscreen="true" scrolling="no" ></iframe>
      </div>
    </div>
  </div> -->
  <div>
    <Options></Options>
  </div>
</template>

<script>
import Options from './components/Options.vue';

export default {
  components: {
    Options
  },
  
  data (){
    return {
      menuItems: [
        {link: "#", icon: "info", text: "test"},
        {link: "#", icon: "info", text: "test2"}
      ]
    };
  },

  computed:{
    message(){
      return this.$store.state.message;
    }
  },

  mounted(){
    $(this.$el).find(".ui.dropdown").dropdown({
        "onShow" (){
          //disable selected classes as this dropdown serves as a menu
          $(this).find(".item.active.selected").removeClass("active selected");
        }
      });
  },

  
  methods: {
    
  }
};
</script>
