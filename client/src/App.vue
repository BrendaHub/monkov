<template lang="html">
  <div id="app">
    <header-bar></header-bar>
    <main class="blog content">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </main>
    <!--<footer class="footer">
      Copyrights ©️2016 <router-link to="/">Domon ji</router-link>
    </footer>-->
  </div>
</template>

<script>
import HeaderBar from 'components/HeaderBar'
export default {
  components: {
    HeaderBar
  }
}
</script>

<style lang="stylus">
@import './stylus/style.styl'
.content
  padding:50px 0
  fullWidth()
</style>
