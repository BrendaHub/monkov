<template>
<div class="blog-page col-2">
  <section class="article-list col-main">
    <article class="blog-post">
      <post-excerpt v-for="n in 5"></post-excerpt>
    </article>
    <nav class="pagination"> <span class="current-page page-numbers">1</span>
      <router-link to="/" class="page-numbers">2</router-link>
      <router-link to="/" class="page-numbers next-page">></router-link>
    </nav>
  </section>
  <side-bar></side-bar>
</div>
</template>

<script>
import SideBar from 'components/SideBar'
import PostExcerpt from 'components/PostExcerpt'
export default {
  components: {
    SideBar,
    PostExcerpt
  }
}
</script>

<style lang="stylus" scoped>
.pagination
    .page-numbers
        background:white
        color:#666
        display: inline-block
        vertical-align: top
        text-align: center
        font-size: 17px
        line-height: 50px
        height: 50px
        width: 50px
        margin: 3px
        position: relative
        overflow: hidden
        z-index: 1
        border-radius: 50%
        box-shadow: 0 0 0 2px #e8e8e8 inset
        transition:all .3s
        &::before
            display: block
            content: ''
            position: absolute
            background:#e95095
            top: 0
            left: 0
            height: 0
            width: 100%
            transition: height 0.3s
            z-index:-1
        &:hover
            color:white
            &::before
                height:100%

    .current-page
        color:white
        background:#e95095
        box-shadow:none
</style>
