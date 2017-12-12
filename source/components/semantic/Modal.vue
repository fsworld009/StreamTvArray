<template>
  <div class="ui modal">
    <!-- <i class="close icon"></i> -->
    <div class="header">
      <h2 class="ui header blue">test2
      </h2>
    </div>
    <div class="scrolling content">
      test
    </div>

    <div class="actions">
      <!-- <button class="ui button red inverted cancel">Close</button> -->
    </div>
  </div>
</template>


<script>
export default {
  props: {
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
    var $modal = $(this.$el);
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
      $modal.modal({
        onHidden: () => {
          this.$emit("closeModal");
        }
      });
    }
  },
  components: {
  }
}
</script>

