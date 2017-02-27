<template>
<div class="comments-list-container">
  <h4 class="title"><span>{{comments.length || 0}} comments</span></h4>
  <div class="comments-list">
    <div class="comments-item">
      <div class="comments-item-meta">
        <img class="avator" src="http://2.gravatar.com/avatar/b8cbfac8510a3974e3828e62fe77f6be?s=50&d=mm&r=g" alt="">
        <div class="author">Domon</div>
        <div class="date">December 13,2016 10:51 am</div>
      </div>
      <div class="comments-item-text">test comment</div>
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
