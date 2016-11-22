<template lang="html">
  <div class="widget-containter hover-purple">
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
export default {}
</script>

<style lang="stylus" scoped>
@import  '../stylus/widget.styl'
</style>