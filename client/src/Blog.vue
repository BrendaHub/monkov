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
    <footer class="footer">
      Copyrights ©️2016 <router-link to="/">Domon ji</router-link>
    </footer>
  </div>
</template>

<script>
import HeaderBar from 'components/HeaderBar'
import Post from 'components/Post'
export default {
  components: {
    HeaderBar,
    Post
  }
}
</script>

<style lang="stylus">
</style>
