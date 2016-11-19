<template>
<header>
  <div class="subheader-top">
    <div class="subheader">
      <div class="subheader-partition left">
        <div class="subheader-cell"><i class="fa fa-phone"></i> <span>+86 15061883140</span></div>
        <div class="subheader-cell"><i class="fa fa-envelope"></i> <a href="mailto:domonji95@gmail.com">domonji95@gmail.com</a></div>
        <div class="subheader-cell"><i class="fa fa-lock"></i> <router-link to="/login">Login</router-link></div>
        <div class="subheader-cell"><a class="selector" href="javascript:void(0)">English</a></div>
      </div>
      <div class="subheader-partition right">
        <div class="social-icon instagram"><a href="/"><i class="fa fa-instagram fa-2" aria-hidden="true"></i></a></div>
      </div>
    </div>
  </div>
    <router-link to="/">home</router-link>
    <router-link to="/post">Post</router-link>
</header>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../stylus/style.styl'

subheader_h = 36px

.subheader-top
  width:100%
  background:#f5f5f5
.subheader
  fullWidth()
  height:subheader_h
  color:#999
  line-height:subheader_h
  font:14px/1.5 fontawesome
  display:flex
  align-items:center
  justify-content:space-between

.subheader-partition
  display:flex
  width:450px
  justify-content:space-between
  align-items:center
  
.right
  justify-content:flex-end
  align-items:center
    
  
.subheader-cell
  display:inline-block

a,.social-icon
  transition:color .3s
  cursor:pointer
  
a:hover
    color:#7049ba

a.selector
  position:relative
  &::after
    display:block
    position:absolute
    top:50%
    right:-1rem
    content:'\f107'
    font-size:1.4rem
    line-height:30px
    margin-top:-15px

@keyframes social_icon_background{
  from {
    background-position:center -100%
  }
}
.social-icon
  height:subheader_h
  width:@height
  font-size:1.5rem
  text-align:center
  &:hover
    a
      color:white

.instagram:hover
  background:radial-gradient(circle farthest-corner at 35% 100%,#fec564,transparent 50%),
             radial-gradient(circle farthest-corner at 10% 140%,#feda7e,transparent 50%),
             radial-gradient(ellipse farthest-corner at 0 -25%,#5258cf,transparent 50%),
             radial-gradient(ellipse farthest-corner at 20% -50%,#5258cf,transparent 50%),
             radial-gradient(ellipse farthest-corner at 100% 0,#893dc2,transparent 50%),
             radial-gradient(ellipse farthest-corner at 60% -20%,#893dc2,transparent 50%),
             radial-gradient(ellipse farthest-corner at 100% 100%,#d9317a,transparent),
             linear-gradient(#6559ca,#bc318f 30%,#e42e66 50%,#fa5332 70%,#ffdc80 100%)
</style>