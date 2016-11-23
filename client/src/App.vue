<template lang="html">
  <div id="app">
    <header-bar></header-bar>
    <main class="blog content">
      <transition name="component-fade">
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
  margin-top:156px


main
  flex:1

#app
    display: flex
    flex-flow:column
    min-height: 100vh
</style>
