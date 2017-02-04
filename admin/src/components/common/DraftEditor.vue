<template lang="html">
  <section :class="{'editor-active':!saved}">
      <div :class="{'title-active':!titleSaved}">
          <input type="text" class="form-control big only-border-bottom" :value="title" @input="updateTitle">
      </div>
      <div class="clearfix">
          <div class="half-container">
              <i class="fa fa-tags" style="margin-right:15px;color:#7f8c8d"></i>
              <span class="tag" v-for="tag in tags">
                {{tag.name}}
                <i class="fa fa-times delete-tag" @click="deleteTag(tag.id)"></i>
              </span>
              <div class="tag active">
                  <span class="tag-add" v-show="!tagInput" @click="addTag()" >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </span>
                  <input type="text" class="tag-input" v-show="tagInput" v-model="tagNew" placeholder="Enter to submit" @keyup.13="submitTag" @keyup.27="tagInput=false">
                  <ul class="search-list reset-list" v-if="tagInput" v-show="tagsToAdd.length">
                      <li class="search-item" @click="submitTag(tag['name'])" v-for="tag in tagsToAdd">{{tag['name']}}</li>
                  </ul>
              </div>
          </div>
          <div class="half-container">
              <i class="fa fa-folder-open" style="margin-right:15px;color:#7f8c8d"></i>
              <span class="tag category" @click="categoryChose=true" v-if="!categoryChose">
                {{category?category.name:'Uncategoried'}}
              </span>
              <div class="tag category active" >
                  <input type="text" class="tag-input" v-show="categoryChose" :placeholder="category?category.name:''" readonly>
                  <ul class="search-list reset-list" v-if="categoryChose" v-show="allCategories.length">
                      <li class="search-item" @click="submitCategory(cat)" v-for="cat in allCategories">{{cat['name']}}</li>
                  </ul>
              </div>
          </div>
          <div class="half-container">
              <i class="fa fa-picture-o" style="margin-right:15px;color:#7f8c8d"></i>
              <div class="tag active">
                  <input type="text" class="image-input" v-model="imagesrc" placeholder="URL of banner picture" @keyup="submitImage(imagesrc)">
              </div>
          </div>
      </div>
      <textarea id="editor" style="opacity: 0"></textarea>
      <div class="half-container">
          <button type="button" class="btn btn-save r" @click="publishDraft">PUBLISH</button>
          <button type="button" class="btn btn-border r" v-show="!postId" @click="deleteDraft">DELETE</button>
      </div>
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
import utils from 'src/utils'
const updateTitleWithDebounce = utils._debounce(async function (title) {
  try {
    await this.submitTitle(title)
    this.saveTitle()
  } catch (e) {
    window.alert(e)
  }
}, 500)
let smde
export default {
  data () {
    return {
      change: true, // true when switching current draft
      published: '', // is current draft published
      tags: [], // tags of current draft
      tagsToAdd: [], // tags to chose when adding tags
      tagNew: '', // the new tag to add
      tagInput: false, // true when typing a new tag
      category: 'Uncategoried', // category of cuurent draft
      allCategories: [], // all categories
      categoryChose: false, // true when chosing a category
      imagesrc: '' // URL of image
    }
  },
  mounted () {
    smde = new SimpleMDE({
      initialValue: this.content,
      autoDownloadFontAwesome: false,
      element: document.getElementById('editor'),
      previewRender: str => md2html(str),
      spellChecker: false,
      toolbar: ['bold', 'italic', 'strikethrough', 'heading-1', 'heading-2', 'heading-3', 'clean-block', '|', 'code', 'quote', 'unordered-list', 'ordered-list', 'table', '|', 'link', 'image', 'horizontal-rule', {
        name: 'more',
        action: function customFunction (editor) {
          //  fix me
        },
        className: 'fa fa-chevron-circle-down',
        title: 'More'
      }, '|', 'preview', 'side-by-side', 'fullscreen', '|', 'guide']
    })
    // autosave when editing the draft
    smde.codemirror.on('change', () => {
      if (this.change) {
        this.change = false
        return
      }
      this.saved && this.editDraft()
      this.postDraft()
    })
    this.change = true
    this.currentId && this.fetchDraft(this.currentId)
    this.fetchAllCategories()
  },
  computed: { ...mapGetters(['currentId', 'saved', 'titleSaved', 'title', 'postId'])
  },
  methods: { ...mapActions(['editDraft', 'saveDraft', 'editTitle', 'saveTitle', 'deleteDraft', 'publish', 'submitTitle', 'submitExcerpt', 'modifyTags', 'modifyCategory', 'modifyImage']),
    async submitTag (val) {
      this.tagInput = false
      const tag = typeof val === 'string' ? val : utils.trim(this.tagNew)
      this.tagNew = ''
      if (!tag) return
      try {
        const res1 = await api.createTag(tag)
        if (res1.success) {
          // return if the tag duplicated
          if (this.tags.some(item => item.id === res1.data.id)) return
          let newTagsArr = this.tags.concat()
          newTagsArr.push(res1.data.id)
          const res2 = await api.modifyDraftTags(this.currentId, newTagsArr)
          if (res2.success) {
            this.tags = res2.data.tags
            this.modifyTags(res2.data.lastEditTime)
          }
        }
      } catch (e) {
        window.alert(e)
      }
    },
    async deleteTag (id) {
      let newTagsArr = []
      this.tags.forEach(t => {
        t.id !== id && newTagsArr.push(t.id)
      })
      try {
        const res = await api.modifyDraftTags(this.currentId, newTagsArr)
        if (res.success) {
          this.tags = res.data.tags
          this.modifyTags(res.data.lastEditTime)
        }
      } catch (e) {
        window.alert(e)
      }
    },
    async submitCategory (val) {
      this.categoryChose = false
      try {
        const res = await api.modifyDraftCategory(this.currentId, val.id)
        if (res.success) {
          this.category = val
          this.modifyCategory(res.data.lastEditTime)
        }
      } catch (e) {
        window.alert(e)
      }
    },
    /**
     * image URL is auto submited
     * so it's wrapped by a debounce function
     */
    submitImage: utils._debounce(async function (val) {
      try {
        const res = await api.modifyDraftImage(this.currentId, val)
        if (res.success) {
          this.imagesrc = val
          this.modifyImage(res.data.lastEditTime)
        }
      } catch (e) {
        window.alert(e)
      }
    }, 2000),
    async publishDraft () {
      if (!this.saved || !this.titleSaved) {
        window.alert('Draft is saving, please try again')
        return
      }
      const res = await this.publish()
      window.alert(res.success ? 'Success!' : 'Failed')
    },
    updateTitle (e) {
      this.editTitle
      updateTitleWithDebounce.call(this, e.target.value)
    },
    addTag () {
      this.tagInput = true
      this.tagNew = ''
      this.searchTags('')
    },
    searchTags: utils._debounce(async function (val) {
      const res = await api.searchTagWithWord(val)
      if (res.success) this.tagsToAdd = res.data
    }, 500),
    async fetchAllCategories () {
      const res = await api.getAllCategories()
      if (res.success) this.allCategories = res.data
    },
    async fetchDraft (id) {
      try {
        const res = await api.getDraft(id)
        if (res.success) {
          this.tagNew = ''
          this.tagInput = false
          this.tags = res.data.tags
          this.category = res.data.category
          this.imagesrc = res.data.imagesrc
          this.$nextTick(() => {
            smde.value(res.data.content)
          })
        }
      } catch (e) {
        window.alert(e)
      }
    },
    /**
     * auto submit the draft when editing
     * so wrapped by debounce
     */
    postDraft: utils._debounce(async function () {
      try {
        const res = await api.modifyDraftContent(this.currentId, smde.value())
        if (res.success) {
          await this.submitExcerpt({
            excerpt: res.data.excerpt,
            time: res.data.lastEditTime
          })
          this.saveDraft()
        } else return Promise.reject()
      } catch (e) {
        window.alert(e)
      }
    }, 1000)
  },
  watch: {
    currentId (val) {
      this.change = true
      val && this.fetchDraft(val)
    },
    // search tags match the letters when typing a new tag
    tagNew (val) {
      this.searchTags(val)
    }
  }
}
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  @import '../../stylus/global.styl'
  .btn
    cursor pointer
    border 1px solid transparent
    border-radius 3px
    padding 6px 10px
    text-align center
    vertical-align middle
    outline 0
    &.btn-save
      color #fff
      background-color $purple
      border-color $purple
    &.btn-info
      color #fff
      background-color $grey
      border-color $grey
    &.btn-border
      color $dark
      background-color white
      border-color $grey
      &:hover
        border-color $purple
    &.btn-cancel
      color #fff
      background-color $red
      border-color $red
    &.btn-block
      width 100%
      box-sizing border-box
  .tag-add
    i
      cursor pointer
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
    width:94%
  .half-container
    box-sizing border-box
    width 100%
    padding 15px 5px 0px 15px
    &:last-child
      padding-bottom 15px
    .btn
      float right
    .btn+.btn
      margin 0 20px
  .category
    cursor pointer
  .imagesrc
    cursor pointer
  .tag
    position relative
    display inline-block
    padding 3px 0
    font-size 14px
    color $light
    border-bottom 2px solid $light
    margin-right 20px
    .iconfont
      display none
    &:hover
      color $purple
      border-bottom 2px solid $purple
      .iconfont
        display inline
    &.active
      color $purple
      border-bottom 2px solid $purple
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
    cursor pointer
    color $light
    padding-left 4px
    &:hover
      color  $purple
    &+&
      padding-top 10px
  .delete-tag
    opacity 0
    position absolute
    right -8px
    top -3px
    font-size 12px
    cursor pointer
  span.tag:hover
    .delete-tag
      opacity 1
  .tag-input
    border none
    background transparent
    color $purple
    font-size 14px
    outline 0
  .image-input
    border none
    background transparent
    color $purple
    font-size 14px
    outline 0
    width 50vw
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
          border-bottom 2px solid $purple
    h3
      margin 3em 0 1.2em
      position relative
      &:before
        content "#"
        color $purple
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
      color $purple
      font-weight 600
    blockquote
      margin 2em 0
      padding-left 20px
      border-left 4px solid $purple
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
