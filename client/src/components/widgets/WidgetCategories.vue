<template lang="html">
  <div class="widget-container">
    <h3>Categories</h3>
    <ul>
      <li>
        <router-link to="/">Python</router-link>
        <span class="post-number">(3)</span>
      </li>
      <li>
        <router-link to="/">Javascript</router-link>
        <span class="post-number">(2)</span>
        <ul>
            <li>
            <router-link to="/">ES6</router-link>
            <span class="post-number">(1)</span>
            </li>
        </ul>
      </li>
      <li>
        <router-link to="/">Unity</router-link>
        <span class="post-number">(1)</span>
      </li>
    </ul>
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
  create() {
    this.fetTags()
  },
  methods: {
    fetTags() {
      api.fetTags().then(res => {
        if (res.success) {
          this.$set(this.tags, res.data.tags)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import  '../../stylus/widget.styl'
</style>
