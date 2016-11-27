<template lang="html">
  <aside class="col-sub" v-scroll="scrollcallback" :style="{marginTop:offsetY + 'px'}">
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
import scrollDirective from '../directives/scroll'
export default {
  data() {
    return {
      offsetY: 0,
      scrollLimit: 0
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
      this.offsetY = document.documentElement.clientWidth <= 900 ? 35 : window.scrollY > 60 ? window.scrollY - 120 : 0
      this.offsetY = Math.min(this.offsetY, this.scrollLimit)
    }
  },
  directives: {
    scroll: scrollDirective
  },
  mounted() {
    setTimeout(() => {
      this.scrollLimit = document.querySelector('.blog-page').offsetHeight - 174 - Array.prototype.reduce.call(document.querySelectorAll('.widget-container'), (a, b) => {
        return b.offsetHeight + a
      }, 0)
    }, 0)
  }
}
</script>

<style lang="stylus" scoped>
aside
  transition: margin 1s
</style>
