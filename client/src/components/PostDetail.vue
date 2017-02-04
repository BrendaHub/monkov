<template lang="html">
  <section class="article-list col-main">
    <article class="blog-post">
      <post-content v-if="post" :id="post.id" :title="post.title" :time="post.createTime" :imagesrc="post.imagesrc" :comments="post.comments" :content="post.content" :category="post.category" :tags="post.tags" detailmode=true></post-content>
    </article>
  </section>
</template>

<script>
import PostContent from 'components/PostContent'
import api from '../api'
export default {
  data () {
    return {
      post: null
    }
  },
  components: {
    PostContent
  },
  methods: {
    async fetchPostDetail () {
      try {
        const res = await api.getPost(this.$route.params.title)
        if (res.success) this.post = res.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.fetchPostDetail()
  },
  watch: {
    '$route': 'fetchPostDetail'
  }
}
</script>
