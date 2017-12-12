<template>
  <div :class="'ui segment '+(typeof borderClass=='undefined'? 'raised':''  )">
    <template v-if="header">
      <component :is="headerSize? 'h'+headerSize : 'h1'" :class="'ui header '+headerClass">{{header}}
        <div class="sub header" v-if="subHeader" v-html="subHeader" />
      </component>
      <div class="content">
        <slot/>
      </div>
    </template>
    <template v-else>
      <slot/>
    </template>
  </div>

</template>

<script>
export default {
  props: ['header','headerSize', 'subHeader','borderClass', 'headerClass']
}
</script>
