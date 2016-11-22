<template>
<footer class="footer">
    <div class="subfooter-top"></div>
    <div class="subfooter-bottom">
        <div class="subfooter-bottom-container">
            <span>
            Copyrights <i class="fa fa-copyright" aria-hidden="true"></i> 2016 <router-link to="/">Domon ji</router-link>
            </span>
            <div class="menu-list">
                <span>
                    <router-link to="/">Home</router-link>
                </span>
                <span>
                    <router-link to="/blog">Blog</router-link>
                </span>
                <span>
                    <router-link to="/about">About</router-link>
                </span>
                <span>
                    <router-link to="/photograph">Photograph</router-link>
                </span>
            </div>
        </div>
    </div>
    
</footer>
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>
@import  '../stylus/style'
footer
    width:100%
    color:#666
    font:.7em/1.6 fontawesome
    a
        color:#999
        transition:color .3s
        &:hover
            color:#ddd

.subfooter-top
    width:100%
    padding:2em 0
    min-height:300px
    background:#1a1a1a

.subfooter-bottom
    height:38px
    background:#222
    line-height:@height

.subfooter-bottom-container
    fullWidth()

.menu-list
    display:inline-block
    float:right
    span
        margin:0 8px
</style>