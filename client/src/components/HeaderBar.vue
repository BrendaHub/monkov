<template>
<header>
  <div class="subheader-back">
    <div class="subheader">
      <div class="subheader-partition left">
        <div class="subheader-cell"><i class="fa fa-phone"></i> <span>+86 15061883140</span></div>
        <div class="subheader-cell"><i class="fa fa-envelope"></i> <a href="mailto:domonji95@gmail.com">domonji95@gmail.com</a></div>
        <div class="subheader-cell"><i class="fa fa-lock"></i> <router-link to="/login">Login</router-link></div>
        <div class="subheader-cell"><a class="selector" href="javascript:void(0)">English</a></div>
      </div>
      <div class="subheader-partition right">
        <div class="social-icon instagram"><a href="https://www.instagram.com/domonji95/" target="_blank"><i class="fa fa-instagram fa-2" aria-hidden="true"></i></a></div>
        <div class="social-icon github"><a href="https://github.com/domonji" target="_blank"><i class="fa fa-github fa-2" aria-hidden="true"></i></a></div>
        <div class="social-icon weibo"><a href="/" target="_blank"><i class="fa fa-weibo fa-2" aria-hidden="true"></i></a></div>
      </div>
    </div>
  </div>
  <div class="header-back">
    <div class="header">
      <div class="logo">Monkov</div>
      <div class="navigator">
        <router-link class="navigator-button" to="/">
          <div>Home</div>
        </router-link>
        <router-link class="navigator-button" to="/blog">
          <div>Blog</div>
        </router-link>
        <router-link class="navigator-button" to="/about">
          <div>About</div>
        </router-link>
        <router-link class="navigator-button" to="/photograph">
          <div>Photograph</div>
        </router-link>
      </div>
    </div>
  </div>
</header>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../stylus/style.styl'

subheader_h = 36px
header_h = 120px

.subheader-back
  width:100%
  background:#f5f5f5
  @media (max-width:600px)
    display:none

.header-back
  width:100%
  background:white
  box-shadow:0 1px 1px rgba(0,0,0,.1)
  
.header
  fullWidth()
  height:header_h
  line-height:header_h

.logo,.navigator
  display:inline-block

.navigator
  float:right
  color:#666
  a
    display:inline-block
    height:header_h
    padding:0 20px

.navigator-button div
  display:inline-block
  position:relative
  &::after
    display:block
    content:''
    position:absolute
    left:0
    bottom:40px
    margin:0 auto -2px
    height:2px
    width:100%
    opacity:0
    transition:all .3s
    background:#e95095

.navigator a:hover
  div
    &::after
      opacity:1
      bottom:50px
  
.subheader
  fullWidth()
  height:subheader_h
  color:#999
  line-height:subheader_h
  font:14px/1.5 fontawesome
  @media (max-width: 1000px) and (min-width: 601px)
    font-size:11px
  display:flex
  align-items:center
  justify-content:space-between

.subheader-partition
  display:flex
  width:500px
  justify-content:flex-start
  align-items:center
  
.right
  justify-content:flex-end
  align-items:center
  &:last-child
    margin-right:20px
  
  
.subheader-cell
  display:inline-block
  text-align:center
  margin:0 10px

a,.social-icon
  transition:color .3s
  cursor:pointer
  
a:hover
    color:#e95095

a.selector
  position:relative
  &::after
    display:block
    position:absolute
    top:50%
    right:-1.4rem
    content:'\f107'
    font-size:1.4rem
    line-height:30px
    margin-top:-15px

.social-icon
  height:subheader_h
  width:@height
  font-size:1.5rem
  text-align:center
  &:hover
    a
      color:white


</style>