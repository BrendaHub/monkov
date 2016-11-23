<template lang="html">
  <aside class="col-sub" >
    <widget-recentpost :style="{marginTop:offsetY + 'px'}"></widget-recentpost>
    <widget-mostcomment></widget-mostcomment>
    <widget-tags></widget-tags>
    <widget-categories></widget-categories>
  </aside>
</template>

<script>
import WidgetRecentpost from 'components/WidgetRecentPost'
import WidgetMostcomment from 'components/WidgetMostComment'
import WidgetTags from 'components/WidgetTags'
import WidgetCategories from 'components/WidgetCategories'
export default {
  data(){
    return {
      offsetY:0
    }
  },
  components:{
    WidgetRecentpost,
    WidgetMostcomment,
    WidgetTags,
    WidgetCategories
  },
  mounted(){
    window.addEventListener('scroll',()=>{
      if (window.scrollY>60 && document.documentElement.clientWidth>900) {
        this.offsetY = window.scrollY - 120
      }
      else
        this.offsetY = 0
      this.offsetY = Math.min(this.offsetY, 190)
    })
  }
}
</script>

<style lang="stylus" scoped>
aside
  @media (max-width: 901px)
    margin-top:35px
</style>
