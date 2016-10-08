<template lang="html">
  <div class="blog-container">
    <header-nav></header-nav>
    <div class="blog content">
      <router-view></router-view>
    </div>
    <footer class="footer">
      Copyrights ©️2016 <a href="#">Domon ji</a>
    </footer>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
export default {
  components: {
    HeaderNav
  }
}
</script>

<style lang="css">
</style>
