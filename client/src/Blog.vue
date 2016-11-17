<template lang="html">
  <div id="app">
    <header-nav></header-nav>
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
import HeaderNav from 'components/HeaderNav'
import Post from 'components/Post'
export default {
  components: {
    HeaderNav,
    Post
  }
}
</script>

<style lang="stylus">
</style>
