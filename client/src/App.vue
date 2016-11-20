<template lang="html">
  <div id="app">
    <header-bar></header-bar>
    <main class="blog content">
      <transition name="slide-fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from 'components/HeaderBar'
import FooterBar from 'components/FooterBar'
export default {
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>

<style lang="stylus">
@import './stylus/style.styl'
.content
  padding:50px 0
  fullWidth()

.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter, .slide-fade-leave-active
  transform:translateX(20px)
  opacity: 0
  position:absolute
</style>
