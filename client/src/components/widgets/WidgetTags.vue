<template lang="html">
  <div class="widget-container hover-purple">
    <h3>Tags</h3>
    <div class="tagcloud">
        <router-link to="/" :style="{fontSize: '13px'}">web</router-link>
        <router-link to="/" :style="{fontSize: '20px'}">design</router-link>
        <router-link to="/" :style="{fontSize: '16px'}">front-end</router-link>
        <router-link to="/" :style="{fontSize: '23px'}">nodejs</router-link>
        <router-link to="/" :style="{fontSize: '29px'}">javascript</router-link>
        <router-link to="/" :style="{fontSize: '22px'}">python</router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import  '../../stylus/widget.styl'

.tagcloud
    margin:16px 0
    a
        color:#999
</style>