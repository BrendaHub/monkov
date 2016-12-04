<template>
<div class="blog-page col-2">
  <section class="article-list col-main">
    <article class="blog-post">
      <post-excerpt v-for="post in postList"
                    :imagesrc="post.imagesrc"
                    :title="post.title"
                    :time="post.lastEditTime"
                    :tags="post.tags"
                    :comments="post.comments"
                    :excerpt="post.excerpt"
                    :category="post.category">
      </post-excerpt>
    </article>
    <nav class="pagination">
      <a href="javascript:void(0)" @click="toPage(currentPage-1)" class="page-numbers next-page" v-show="currentPage > 1">&lt;</a>
      <a href="javascript:void(0)" @click="toPage(n)" v-for="n in totalPage" :class="[{'current-page':n==currentPage},'page-numbers']">{{n}}</a>
      <a href="javascript:void(0)" @click="toPage(currentPage+1)" class="page-numbers next-page" v-show="currentPage < totalPage">&gt;</a>
    </nav>
  </section>
  <side-bar></side-bar>
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
      postList: [
      //   {
      //   imagesrc: 'http://attachments.gfan.com/forum/attachments2/day_111219/111219103029495151192482e6.jpg',
      //   title: 'This is an example post',
      //   time: 'November 2016',
      //   category: 'web',
      //   tags: ['web', 'js', 'vue'],
      //   comments: 8,
      //   excerpt: '<p>this is an example post made with vuejs and koa<p/>'
      // }, {
      //   imagesrc: 'http://attachments.gfan.com/forum/attachments2/day_111219/111219103029495151192482e6.jpg',
      //   title: 'This is an example post',
      //   time: 'November 2016',
      //   category: 'web',
      //   tags: ['web', 'js', 'vue'],
      //   comments: 8,
      //   excerpt: '<p>this is an example post made with vuejs and koa<p/>'
      // }
    ],
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
        limit: this.postLimit
      }).then(res => {
        if (res.success) {
          this.postList = res.data.postArr
          this.totalPage = Math.ceil(res.data.totalNumber / this.postLimit)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toPage(n){
      this.$router.push({
        path:'blog',
        query:{
          page:n
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
