<template>
<div class="blog-page col-2">
    <section class="article-list col-main">
        <article class="blog-post">
            <router-link to="/blog"><img class="post-image" src="../assets/img-1-1024x768.jpg" alt=""></router-link>
            <div class="post-body">
                <h2 class="post-title">
                    <router-link to="/post/1">This is an example post</router-link>
                </h2>
                <div class="post-meta hover-purple">
                    <time class="last-update">November 15,2016</time>
                    <span class="author"><router-link to="/">Domon Ji</router-link></span>
                    <span class="category"><router-link to="/">Web Design</router-link></span>
                    <span class="tags">
                        <router-link to="/">design</router-link>,
                        <router-link to="/">web</router-link>,
                        <router-link to="/">front-end</router-link>
                    </span>
                    <span class="comments"><router-link to="/">8 comments</router-link></span>
                </div>
                <div class="excerpt">
                    <p>
                        This is my blog made with vuejs,koa and mongodb!
                        This is my blog made with vuejs,koa and mongodb!
                        This is my blog made with vuejs,koa and mongodb…
                    </p>
                </div>
                <router-link to="/" class="readmore">
                    <span>read more</span>
                </router-link>
            </div>
        </article>
        <nav class="pagination">
            <span class="current-page page-numbers">1</span>
            <router-link to="/" class="page-numbers">2</router-link>
            <router-link to="/" class="page-numbers next-page">></router-link>
        </nav>
    </section>
    <side-bar></side-bar>
</div>
</template>

<script>
import SideBar from 'components/SideBar'
export default {
    components:{
        SideBar
    }
}
</script>

<style lang="stylus" scoped>

.post-image
    width:100%
    object-fit:cover

.post-title
    margin:10px 0 0 0
    color:#444
    display:inline-block
    width:100%
    height:64px
    line-height:64px
    font:32px/2 Verdana
    letter-spacing:-1px
    color:inherit
    font-weight:700
    a
        color:#444
.post-meta 
    display:flex
    justify-content:flex-start
    flex-wrap:wrap
    time,span
        margin:10px 20px 0 0
        display:inline-block
        font-size:.7rem
        color:#999

.last-update::before
    content:'\f017'
    font:14px fontawesome
    margin:0 5px 0 0
.category::before
    content:'\f07c'
    font:14px fontawesome
    margin:0 5px 0 0
.tags::before
    content:'\f02c'
    font:14px fontawesome
    margin:0 5px 0 0
.comments::before
    content:'\f086'
    font:14px fontawesome
    margin:0 5px 0 0
.author::before
    content:'\f007'
    font:14px fontawesome
    margin:0 5px 0 0

.excerpt
    color:#666
    font-size:.9rem
    p
        line-height:24px

.readmore
    display:inline-block
    margin:10px 0 0 0
    color:#666
    font-weight:800
    font-family:Verdana
    font-size:15px
    line-height:2.8
    padding:0 1.8em
    letter-spacing:0
    text-transform: uppercase
    box-shadow: 0 0 0 2px #e8e8e8
    border-radius: 0.3em
    position:relative
    overflow:hidden
    border:none
    &::before
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 0;
        background-color: rgba(0,0,0,.1);
        transition: height 0.3s;

.readmore:hover
    &::before
        height:42px

.pagination
    margin:56px 0 0 0
    .page-numbers
        background:white
        color:#666
        display: inline-block
        vertical-align: top
        text-align: center
        font-size: 17px
        line-height: 50px
        height: 50px
        width: 50px
        margin: 3px
        position: relative
        overflow: hidden
        z-index: 1
        border-radius: 50%
        box-shadow: 0 0 0 2px #e8e8e8 inset
        transition:all .3s
        &::before
            display: block
            content: ''
            position: absolute
            background:#e95095
            top: 0
            left: 0
            height: 0
            width: 100%
            transition: height 0.3s
            z-index:-1
        &:hover
            color:white
            &::before
                height:100%

    .current-page
        color:white
        background:#e95095
        box-shadow:none
</style>
