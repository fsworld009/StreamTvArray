<template>
  <div class="stream-container">
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
  </div>
</template>

<style>
.stream-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.stream-col {
  position: relative;
  float: left;
  width: 50vw;
  height: 50vh;
}

body {
  overflow: hidden;
}

iframe {
  width: 100%;
  height: 100%;
}

iframe.stream {
  z-index: 1;
}

.chat-container {
  position: absolute;
  right: 0;
  top: 0;
  width: 25%;
  height: calc(100% - 35px);
  z-index: 3;
  opacity: 0.2;
  transition: opacity 0.5s;
}

.chat-container:hover {
  opacity: 1;
  height: 100%;
}

.stream-menu {
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 3;
}

.stream-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.ui.dropdown .menu > .item {
  padding: 5px!important;
}
</style>


<script>

export default {
  data (){
    return {
      message: "Hello World",
      menuItems: [
        {link: "#", icon: "info", text: "test"},
        {link: "#", icon: "info", text: "test2"}
      ]
    };
  },
  components: {
    
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
