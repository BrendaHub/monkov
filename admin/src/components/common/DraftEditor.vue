<template lang="html">
  <section :class="{'editor-active':!saved}">
      <div :class="{'title-active':!titleSaved}">
          <input type="text" class="form-control big only-border-bottom" :value="draftTitle" @input="updateTitle">
      </div>
      <div class="clearfix">
          <div class="half-container">
              <i class="icon-biaoqian iconfont" style="margin-right:5px"></i>
              <span class="tag" v-for="tag in tags">{{tag['name']}} <i class="icon-chacha iconfont delete-tag" @click="deleteTag(tag.id)"></i></span>
              <div class="tag active">
                  <span v-show="!tagInput" @click="addTag()" >+</span> <input type="text" class="tag-input" v-show="tagInput" v-model="tagNew" placeholder="Enter to submit" @keyup.13="submitTag">
                  <ul class="search-list reset-list" v-if="tagInput" v-show="tagsToAdd.length">
                      <li class="search-item" @click="submitTag(tag['name'])" v-for="tag in tagsToAdd">{{tag['name']}}</li>
                  </ul>
              </div>
          </div>
          <div class="half-container">
              <button type="button" class="btn btn-save r" @click="publish">PUBLISH</button>
              <button type="button" class="btn btn-border r" v-show="PostId === null" @click="deleteDraft">DELETE</button>
          </div>
      </div>
      <textarea id="editor" style="opacity: 0"></textarea>
  </section>
</template>

<script>
import api from 'src/api'
import SimpleMDE from 'simplemde'
import md2html from 'src/markdown'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  _debounce,
  trim
} from 'src/utils'
const updateTitleWithDebounce = _debounce(title => {
  this.submitTitle(title).then(() => {
    this.saveTitle()
  }).catch(err => window.alert('Network Error'))
}, 500)
let smde
export default {
  data() {
    return {
      change: true,
      published: '',
      tags: [],
      tagsToAdd: [],
      tagNew: '',
      tagInput: false
    }
  },
  ready() {
    smde = new SimpleMDE({
      autoDownloadFontAwesome: false,
      element: document.getElementById('editor'),
      previewRender: txt => md2html(txt),
      spellChecker: false
    })
    let postDraft = _debounce(() => {
      api.modifyDraftContent(this.currentId, smde.value()).then(res => {
        if (res.success) {
          this.submitExcerpt(res.data.excerpt, res.data.lastEditTime)
          this.saveDraft()
        } else {
          return Promise.reject()
        }
      }).catch(err => window.alert('Network error, please try again'))
    }, 2000)
    smde.codemirror.on('change', () => {
      if (this.change) {
        this.change = false
        return
      }
      this.saved && this.editDraft()
      postDraft()
    })
    this.change = true
    this.currentId && api.getDraft(this.currentId).then(res => {
      if (res.success) {
        this.tagNew = ''
        this.tagInput = false
        this.tags = res.data.tags
        this.$nextTick(() => {
          smde.value(res.data.content)
        })
      }
    }).catch(err => window.alert('Network error'))
  },
  computed: { ...mapGetters(['currentId', 'saved', 'titleSaved', 'title', 'postId'])
  },
  methods: { ...mapActions(['editDraft', 'saveDraft', 'editTitle', 'saveTitle', 'deleteDraft', 'publish', 'submitTitle', 'submitExcerpt', 'modifyTags']),
    submitTag(val) {
      this.tagInput = false
      const tag = typeof val === 'string' ? val : trim(this.tagNew)
      this.tagNew = ''
      tag && api.createTag(tag).then(res => {
        const name = res.data.name
        if (this.tags.some(item => item.name === name)) return
        let newTagsArr = this.tags.map(item => item.name)
        newTagsArr.push(name)
        return api.modifyDraftTags(this.title, newTagsArr)
      }).then(res => {
        if (res.success) {
          this.tags = res.data.tags
          this.modifyTags(res.data.lastEditTime)
        }
      }).catch(err => window.alert('Network error'))
    },
    deleteTag(name) {
      let newTagsArr = []
      this.tags.forEach(t => {
        t.name !== name && newTagsArr.push(name)
      })
      api.modifyDraftTags(this.currentId, newTagsArr).then(res => {
        if (res.success) {
          this.tags = res.data.tags
          this.modifyTags(res.data.lastEditTime)
        }
      }).catch(err => window.alert('Network error'))
    },
    publish() {
      if (!this.saved || !this.titleSaved) {
        window.alert('Draft is saving, please try again')
        return
      }
      this.publish().then(() => window.alert('Success!')).catch(err => window.alert(err.error_message && err.error_message.console.error()))
    },
    updateTitle(e) {
      this.editTitle
      updateTitleWithDebounce.call(this, e.target.value)
    },
    addTag() {
      this.tagInput = true
      this.tagNew = ''
      this.searchTags('')
    },
    searchTags(val) {
      api.searchTagWithWord(val).then(res => {
        if (res.success) this.tagsToAdd = res.data
      })
    }
  },
  watch: {
    currentId(val) {
      this.change = true
      val && api.getDraft(val).then(res => {
        if (res.success) {
          this.tagNew = ''
          this.tagInput = false
          this.tags = res.data.tags
          this.$nextTick(() => {
            smde.value(res.data.content)
          })
        }
      }).catch(err => {
        console.log(err)
        window.alert('Network error')
      })
    },
    tagNew(val) {
      this.searchTags(val)
    }
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .title-active
    .big
      border 1px solid $yellow
  .big
    transition border 0.5s
    padding 13px 20px 13px 30px
    font-size 26px
  .only-border-bottom
    border 1px solid transparent
    border-bottom 1px solid $border
  .half-container
    float left
    box-sizing border-box
    width 50%
    padding 15px
    .btn+.btn
      margin-right 20px
  .tag
    position relative
    display inline-block
    padding 3px 0
    font-size 14px
    color $light
    border-bottom 2px solid $light
    margin-top 5px
    margin-right 20px
    .iconfont
      display none
    &:hover
      color $green
      border-bottom 2px solid $green
      .iconfont
        display inline
    &.active
      color $green
      border-bottom 2px solid $green
      position relative
  .search-list
    position absolute
    top 25px
    left -6px
    z-index 100
    width 100%
    padding 5px
    background white
    border: 1px solid $border
    border-radius 4px
    box-shadow 0 6px 12px rgba(0,0,0,.03)
  .search-item
    color $light
    padding-left 4px
    &:hover
      color  $green
    &+&
      padding-top 10px
  .delete-tag
    display none
    position absolute
    right -8px
    top -3px
    font-size 12px
  .tag-input
    border none
    background transparent
    color $green
    font-size 14px
    outline 0
  .editor-toolbar
    border-left 0
  .editor-active
    .CodeMirror
      border 1px solid $yellow
  .CodeMirror
    transition border 0.5s
    border-left 1px solid transparent
  .CodeMirror-sided
    box-sizing border-box
  .editor-preview,
  .editor-preview-side
    background white
    padding: 0.2em 1.4em 0;
    font-family $body-font
    font-size $body-font-size
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color $medium

    a
      text-decoration none
      color $medium

    :focus
      outline 0

    img
      border none

    h1, h2, h3, h4, strong
      font-weight 600
      color $dark

    code, pre
      font-family $code-font
      font-size $code-font-size
      background-color $codebg
      -webkit-font-smoothing initial
      -moz-osx-font-smoothing initial

    code
      color #e96900
      padding 3px 5px
      margin 0 2px
      border-radius 2px
      white-space nowrap

    em
      color $light

    p
      word-spacing 0.05em

    img
      max-width 100%
    span.light
      color $light
    span.info
      font-size .85em
      display inline-block
      vertical-align middle
      width 280px
      margin-left 20px
    h1
      margin 0 0 .5em
    h2
      margin: 2em 0 0.8em;
      padding-bottom: 0.7em;
      border-bottom: 1px solid #ddd;
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
    h3
      margin 3em 0 1.2em
      position relative
      &:before
        content "#"
        color $green
        position absolute
        left -0.7em
        top -2px
        font-size 1.2em
        font-weight bold
    h4
      color $light
      margin 1.2em 0
    figure, p, ul, ol
      margin 1.2em 0
    p, ul, ol
      line-height 1.6em
    ul, ol
      padding-left 1.5em
    a
      color $green
      font-weight 600
    blockquote
      margin 2em 0
      padding-left 20px
      border-left 4px solid $green
      p
        font-weight 600
        margin-left 0
    iframe
      margin 1em 0
    p.tip
      padding 12px 24px 12px 30px
      margin 2em 0
      border-left 4px solid $red
      background-color $codebg
      position relative
      border-bottom-right-radius $radius
      border-top-right-radius $radius
      &:before
        position absolute
        top 14px
        left -12px
        background-color $red
        color #fff
        content "!"
        width 20px
        height 20px
        border-radius 100%
        text-align center
        line-height 20px
        font-weight bold
        font-family $logo-font
        font-size 14px
    figure, p
      margin-left 0
    pre
      position relative
      background-color $codebg
      padding .8em .8em .4em
      line-height 1.1em
      border-radius $radius
      code
        overflow-x auto
        display block
        padding 1.2em 1.4em
        line-height 1.5em
        margin 0
        color #525252
        border-radius 0
        white-space pre
        &.lang-html, &.lang-javascript, &.lang-bash, &.lang-css
          &:after
            position absolute
            top 0
            right 0
            color #ccc
            text-align right
            font-size .75em
            padding 5px 10px 0
            line-height 15px
            height 15px
            font-weight 600
        &.lang-html:after
          content 'HTML'
        &.lang-javascript:after
          content 'JS'
        &.lang-bash:after
          content 'Shell'
        &.lang-css:after
          content 'CSS'
</style>
