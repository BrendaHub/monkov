<template lang="html">
  <aside class="col-sub" v-scroll="scrollcallback" :style="{marginTop:offsetY+'px'}">
    <widget-recentpost ></widget-recentpost>
    <widget-mostcomment></widget-mostcomment>
    <widget-tags></widget-tags>
    <widget-categories></widget-categories>
  </aside>
</template>

<script>
import WidgetRecentpost from 'components/widgets/WidgetRecentPost'
import WidgetMostcomment from 'components/widgets/WidgetMostComment'
import WidgetTags from 'components/widgets/WidgetTags'
import WidgetCategories from 'components/widgets/WidgetCategories'
import eventDirective from 'src/directives/eventListener'
const {
  reduce
} = Array.prototype
export default {
  data() {
    return {
      offsetY: 0,
      blogEle: null,
      widgets: null
    }
  },
  components: {
    WidgetRecentpost,
    WidgetMostcomment,
    WidgetTags,
    WidgetCategories
  },
  methods: {
    scrollcallback() {
      let limit = this.blogEle.offsetHeight - 174 - this.widgets::reduce((a, b) => {
        return b.offsetHeight + a
      }, 0)
      this.offsetY = document.documentElement.clientWidth <= 900 ? 35 : window.scrollY > 60 ? window.scrollY - 120 : 0
      this.offsetY = Math.max(Math.min(this.offsetY, limit), 0)
    }
  },
  directives: {
    scroll: eventDirective('scroll')
  },
  mounted() {
    this.blogEle = document.querySelector('.blog-page')
    this.widgets = document.querySelectorAll('.widget-container')
  }
}
</script>

<style lang="stylus" scoped>
aside
  transition: margin 1s
</style>
