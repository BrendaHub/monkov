<template>
<footer class="footer">
    <div class="subfooter-top"></div>
    <div class="subfooter-bottom">
        <span>
            Copyrights ©️2016 <router-link to="/">Domon ji</router-link>
        </span>
    </div>
    
</footer>
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>
footer
    width:100%
    color:#808080
    font:.7em/1.6 fontawesome

.subfooter-top
    width:100%
    padding:2em 0
    min-height:300px
    background:#1a1a1a

.subfooter-bottom
    height:38px
    background:#222
    line-height:@height
</style>