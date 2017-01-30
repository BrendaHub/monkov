<template lang="html">
  <aside class="sidebar">
      <img src="../../assets/image/logo.svg" alt="" class="sidebar-logo">
      <nav class="aside-nav">
          <ul class="aside-nav-list">
              <li class="aside-nav-item"><router-link class="aside-nav-button" to="/drafts"><i class="fa fa-file-text" aria-hidden="true"></i></router-link></li>
              <li class="aside-nav-item"><router-link class="aside-nav-button" to="/tags"><i class="fa fa-tags" aria-hidden="true"></i></router-link></li>
              <li class="aside-nav-item"><router-link class="aside-nav-button" to="/categories"><i class="fa fa-folder-open" aria-hidden="true"></i>
              </router-link></li>
              <li class="aside-nav-item"><router-link class="aside-nav-button" to="/users"><i class="fa fa-user" aria-hidden="true"></i>
              </router-link></li>
              <li class="aside-nav-item"><router-link class="aside-nav-button" to="/plugins"><i class="fa fa-plug" aria-hidden="true"></i>
              </router-link></li>
              <li class="aside-nav-item"><router-link class="aside-nav-button" to="/settings"><i class="fa fa-cog" aria-hidden="true"></i>
              </router-link></li>
          </ul>
      </nav>
      <nav class="aside-menu">
          <ul class="aside-nav-list">
              <li class="aside-nav-item">
                  <a href="javascript:void(0);" @click="deleteToken()" class="aside-nav-button"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
              </li>
          </ul>
      </nav>
  </aside>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  methods: { ...mapActions(['deleteToken'])
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .sidebar
    box-sizing border-box
    border-right 1px solid $border
    background-color #f8f8f8
    text-align center
    color white
    position fixed
    height 100%
    width 70px
    padding 12px 12px 24px 12px
    left 0
    top 0
    .aside-nav
      margin-top 30px
  .sidebar-logo
    margin-top 5px
    width 36px
  .aside-nav
    border-top 1px solid $border
  .aside-nav-list
    list-style none
    padding 0
  .aside-nav-item
    padding 15px 0
  .aside-nav-button
    cursor pointer
    display inline-block
    box-sizing border-box
    width 45px
    height 45px
    background #fff
    padding 12px 0 0 1px
    border 1px solid $border
    border-radius 50%
    color $purple
    &.router-link-active
      border 1px solid $purple
    &:hover
      color white
      background $purple
      border 1px solid $purple
    .iconfont
      font-size 22px
  .aside-menu
    position absolute
    width 100%
    left 0
    bottom 0
</style>
