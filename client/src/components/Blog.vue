<template>
<div>
  <div class="placeholder"></div>
  <div class="querybar-back" v-if="$route.query.tag || $route.query.category">
    <div class="querybar">
      <h2 class="query-content">{{$route.query.tag?'Tag':'Category'}} : {{$route.query.tag || $route.query.category}}</h2>
      <div class="query-nav">
        <router-link to="/posts">Blog</router-link> &gt; <span>{{$route.query.tag?'Posts Tagged':'Archive by Category'}} "{{$route.query.tag || $route.query.category}}"</span> </div>
    </div>
  </div>
  <main class="blog content">
    <div class="blog-page col-2">
      <section class="article-list col-main">
        <article class="blog-post">
          <post-excerpt v-for="post in postList" :id="post._id" :imagesrc="post.imagesrc" :title="post.title" :time="post.createTime" :tags="post.tags" :comments="post.comments" :excerpt="post.excerpt" :category="post.category"> </post-excerpt>
        </article>
        <nav class="pagination"> <a href="javascript:void(0)" @click="toPage(currentPage-1)" class="page-numbers next-page" v-show="currentPage > 1">&lt;</a> <a href="javascript:void(0)" @click="toPage(n)" v-for="n in totalPage" :class="[{'current-page':n==currentPage},'page-numbers']">{{n}}</a>          <a href="javascript:void(0)" @click="toPage(currentPage+1)" class="page-numbers next-page" v-show="currentPage < totalPage">&gt;</a> </nav>
      </section>
      <side-bar></side-bar>
    </div>
  </main>
</div>
</template>

<script>
import SideBar from 'components/SideBar'
import PostExcerpt from 'components/PostExcerpt'
import api from '../api'
export default {
  props: {
    postLimit: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      postList: [],
      totalPage: 2,
      currentPage: ~~this.$route.query.page || 1
    }
  },
  components: {
    SideBar,
    PostExcerpt
  },
  created() {
    this.fetchPostList()
  },
  methods: {
    fetchPostList() {
      api.getPostList({
        page: this.currentPage,
        limit: this.postLimit,
        tag: this.$route.query.tag || '',
        category: this.$route.query.category || ''
      }).then(res => {
        if (res.success) {
          this.postList = res.data.postArr
          this.totalPage = Math.ceil(res.data.totalNumber / this.postLimit)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toPage(n) {
      this.$router.push({
        path: 'blog',
        query: {
          page: n,
          limit: this.postLimit,
          tag: this.$route.query.tag,
          category: this.$route.query.category
        }
      })
      this.currentPage = n
    }
  },
  watch: {
    '$route': 'fetchPostList'
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/style.styl'
.content
  padding:50px 0
  fullWidth()

main
  flex:1

.placeholder
  height:156px
  position:relative
  @media (max-width: 601px)
    height:120px

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

.querybar
  position:relative
  display:flex
  line-height:24px
  padding:2em 20px 2em
  fullWidth()
  justify-content:space-between
  @media (max-width: 601px)
    justify-content:center
    align-items:center
    flex-flow:column
  .query-content
    font-size:1.4rem
    font-weight:400
    display:inline-block
    color:#444
    letter-spacing:1
    text-transform:capitalize
    margin:.3rem 1.5rem .3rem 0

.query-nav
  display:inline-block
  font-size:.7rem
  color:#666
  padding-right:20px
  z-index:2
  line-height:1.4
  margin:.6rem 0 .3rem
  a
    color:#e95095 !important
    transition:color .3s
    &:hover
      color:#7049ba !important

.querybar-back
  background:#f5f5f5
</style>
