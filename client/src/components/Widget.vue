<template lang="html">
  <div class="widget-containter">
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
.widget-containter
  h3
    font-weight:500
    font-size:22px
    font-family:Verdana
    color:#444
  a
    color:#e95095
  li
    font-size:14px
    line-height:1.5em
    padding-left:18px
    position:relative
    margin-bottom:1em
    vertical-align:top
    z-index:-1
    &::before
      position: absolute
      top:-1px
      left: 2px
      content: '\f105'
      font-family: fontawesome
      font-size: 18px
      opacity: .5

.post-date
    display: block;
    font-size: .9em;
    padding-top: 3px;
    opacity: .5;
</style>