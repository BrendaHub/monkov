<template>
<div class="comments-list-container">
  <h4 class="title"><span>{{comments.length || 0}} comments</span></h4>
  <div class="comments-list">
    <div class="comments-item" v-for="comment in comments">
      <div class="comments-item-meta">
        <img class="avator" :src="comment.author.avator" alt="">
        <div class="author">{{comment.author.name}}</div>
        <div class="date">{{comment.date}}</div>
      </div>
      <div class="comments-item-text">{{comment.text}}</div>
      <div class="comments-item-reply">
        <!--<a href="#">Reply</a>-->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  color #444
  font-size 24px
  &:before
    display inline-block
    vertical-align top
    content '\f086'
    font-family fontawesome
    margin-right .8rem
    opacity .33
  border-top 1px solid #eee
  padding-top 2rem

.comments-item
  padding 2rem 0
  margin-bottom 2rem
  position relative
  border-bottom 1px solid #eee

.comments-item-meta
  margin-bottom 1rem
  margin-left calc(50px + 1.3rem)
  div
    display inline-block
  .author
    margin-right 1rem
    font-weight 600
    color:#666
  .date
    opacity .5

.comments-item-text
  margin-left calc(50px + 1.3rem)
  color #666
  font-weight 400

.avator
  position absolute
  width 50px
  border-radius 50%
  overflow hidden
  top 2rem
  left 0
</style>
