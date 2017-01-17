<template lang="html">
  <ul class="draft-list reset-list">
      <li class="draft-list-item" v-for="(draft,index) in all" @click="focus(index)">
          <article class="draft-thumb" :class="[ draft['draftPublished']?'published':draft['post']?'updated':'',
          {'active':draft['id'] === currentId} ]">
            <h3 class="draft-title">{{draft['title']}}</h3>
            <h6 class="draft-time">{{draft['lastEditTime']}}</h6>
            <p class="draft-content" v-md="draft['excerpt']"></p>
          </article>
      </li>
  </ul>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  computed: { ...mapGetters(['currentId', 'currentIndex', 'saved', 'all', 'titleSaved'])
  },
  method: {
    focus(index) {
      if (this.saved && this.titleSaved) {
        index !== this.currentIndex && this.focusOnDraft(index)
      } else {
        window.alert('Current draft is saving, please try again')
        return
      }
    },
    ...mapActions(['focusOnDraft'])
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .draft-list
    border-top 1px solid $border
  .draft-list-item
    cursor pointer
    margin 0 25px
    padding 20px 0
    border-bottom 1px solid $border
  .draft-thumb
    padding-left 5px
    &.published
      border-left 2px solid $green
    &.updated
      border-left 2px solid $yellow
    .draft-title
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size 16px
      line-height 1.3
      font-weight 400
      margin 0 0 4px
      padding-bottom 0
    &.active
      .draft-title
        color $green
    &:hover
      .draft-title
        color $green
    .draft-content
      color $light
      font-size 12px
      font-weight 400
      line-height 17px
      margin 0
      max-height ( 3 * @line-height )
      overflow hidden
      word-wrap break-word
    .draft-time
      color $light
      margin 0 0 6px
  .draft-thumb-content
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
