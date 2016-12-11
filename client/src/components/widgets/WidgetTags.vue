<template lang="html">
  <div class="widget-container">
    <h3>Tags</h3>
    <div class="tagcloud">
        <router-link v-for="tag in tags" :to="'/posts?tag='+tag.name" :style="{fontSize: '23px'}">{{tag.name}} </router-link>
    </div>
  </div>
</template>

<script>
import api from 'src/api'
export default {
  data() {
    return {
      tags: []
    }
  },
  methods: {
    fetchTags() {
      api.getAllTags().then(res => {
        this.tags = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.fetchTags()
  }
}
</script>

<style lang="stylus" scoped>
@import  '../../stylus/widget.styl'

.tagcloud
    margin:16px 0
    a
        color:#999
</style>
