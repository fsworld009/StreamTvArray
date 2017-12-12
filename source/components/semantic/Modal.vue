<template>
  <div class="ui modal">
    <i class="close icon" v-if="options.closeIcon"></i>
    <div class="header">
      <h2 class="ui header blue">{{options.title}}
      </h2>
    </div>
    <div class=" content"><!-- scrolling-->
      <slot></slot>
    </div>

    <div class="actions">
      <!-- <button class="ui button red inverted cancel">Close</button> -->
    </div>
  </div>
</template>


<script>
export default {
  props: {
    options: {
      type: Object,
      default: {}
    }
    // project: {
    //   type: Object
    // }
  },
  data(){
    return {
      shown: false
    }
  },
  mounted() {
    this.createModal();
    this.showModal();
  },
  updated(){
    this.showModal();
  },
  beforeDestroy(){
    console.log("beforeDestroy");
    var $modal = $(this.$el);
    $modal.modal('hide');
    $modal.modal('destroy');
  }, 
  methods: {
    showModal(){
      var $modal = $(this.$el);
      if(!this.shown){
        $modal.modal('show');
        this.shown=true;
      }
    },

    createModal(){
      var $modal = $(this.$el);

      var options = Object.assign({
        onHidden: () => {
          this.$emit("closeModal");
        }
      }, this.options);
      $modal.modal(options);
    }
  },
  components: {
  }
}
</script>

