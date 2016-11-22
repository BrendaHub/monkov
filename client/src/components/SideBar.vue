<template lang="html">
  <aside class="col-sub">
    <widget-recentpost></widget-recentpost>
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
    components:{
        WidgetRecentpost,
        WidgetMostcomment,
        WidgetTags,
        WidgetCategories
    }
}
</script>

<style lang="stylus">
</style>
