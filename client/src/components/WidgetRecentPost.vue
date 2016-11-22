<template lang="html">
  <div class="widget-containter hover-purple">
    <h3>Recent Post</h3>
    <ul>
      <li>
        <router-link to="/">This is an example post</router-link>
        <span class="post-date">November 21,2016</span>
      </li>
       <li>
        <router-link to="/">This is an example post,This is an example post,This is an example post</router-link>
        <span class="post-date">November 21,2016</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import  '../stylus/widget.styl'
</style>