<template lang="html">
  <aside class="col-sub">
    <widget></widget>
  </aside>
</template>

<script>
import Widget from 'components/Widget'
export default {
    components:{
        Widget
    }
}
</script>

<style lang="stylus">
aside
  @media screen and (max-width: 801px)
    display:none
</style>
