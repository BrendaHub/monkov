<template lang="html">
<div class="post-excerpt">
    <router-link :to="'/posts/'+title" v-if="imagesrc"><img class="post-image" :src="imagesrc" alt=""></router-link>
    <div class="post-body">
        <h2 class="post-title">
            <router-link :to="'/posts/'+title">{{title}}</router-link>
        </h2>
        <div class="post-meta">
            <time class="last-update">{{time}}</time>
            <span class="author"><router-link to="/">{{author}}</router-link></span>
            <span class="category" v-if="category"><router-link :to="'/posts?category='+category.name">{{category.name}}</router-link></span>
            <span class="tags" v-if="tags.length>0">
                <router-link :to="'/posts?tag='+tag.name" v-for="tag in tags"> {{tag.name}} </router-link>
            </span>
            <span class="comments" v-if="comments"><router-link to="/">{{comments}} comments</router-link></span>
        </div>
        <div class="excerpt" v-html="excerpt"></div>
        <router-link :to="'/posts/'+title" class="readmore">
            <span>read more</span>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    imagesrc: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Domon Ji'
    },
    time: {
      type: String,
      required: true
    },
    category: Object,
    tags: {
      type: Array,
      default: () => []
    },
    comments: {
      type: Number,
      default: 0
    },
    excerpt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/style.styl'
.post-image
    width:100%
    object-fit:cover

.post-title
    margin:20px 0
    color:#444
    display:inline-block
    width:100%
    // height:64px
    font:32px/1.2 Verdana
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
    a
        hoverPurple()

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

.post-excerpt
    margin:0 0 56px 0
</style>
