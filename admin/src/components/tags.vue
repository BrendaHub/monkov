<template lang="html">
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="draft-list-column">
      <h3 class="page-title" style="margin-bottom:0" v-if="tagActive"><i class="icon-biaoqian iconfont"></i>Search By Tag</h3>
      <ul class="clearfix reset-list tag-list" v-if="tagActive">
        <li class="tag active">
          <span v-show="!tagActive['editing']">{{tagActive['name']}}</span>
          <i class="icon-chacha iconfont" v-show="!tagActive['editing']" @click="blurTag()"></i>
          <i class="icon-edit iconfont" @click="modifyTag(tagActive)" v-show="!tagActive['editing']"></i>
          <i class="icon-shanchu iconfont" style="vertical-align: 1px;" @click="deleteTag(tagActive)" v-show="!tagActive['editing']"></i>
          <input type="text" class="tag-input" v-if="tagActive['editing']" v-model="tagActive['newName']" placeholder="Enter to submit" @keyup.13="saveTag(tagActive)"></li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
        <li class="tag" v-for="tag in tags"  v-show="tag !== tagActive"> <span @click="searchTag(tag)" v-show="!tag['editing']">{{tag['name']}}</span> </li>
      </ul>
      <draft-list></draft-list>
    </section>
    <div class="draft-edit">
      <draft-editor v-if="null !== currentdraftId"></draft-editor>
    </div>
  </div>
</template>

<script>
import DraftEditor from 'components/common/DraftEditor'
import DraftList from 'components/common/DraftList'
import NavAside from 'components/common/NavAside'
import {
  mapGetters,
  mapActions
} from 'vuex'
import api from 'src/api'
export default {
  data() {
    return {
      tagActive: null,
      tags: []
    }
  },
  components: {
    DraftEditor,
    DraftList,
    NavAside
  },
  computed: { ...mapGetters(['currentId'])
  },
  method: {
    searchTag(tag) {
      this.tagActive = tag
      this.getDraftList(tag.name) //or tag
    },
    modifyTag(tag) {
      tag.newName = tag.name
      tag.editing = true
    },
    saveTag(tag) {
      if (tag.name === tag.newName || !tag.newName) {
        tag.editing = false
        return
      } else {
        api.modifyTag(tag.name, tag.newName).then(res => {
          if (res.success) {
            tag.name = tag.newName
            tag.editing = false
          } else window.alert('Tag duplicated')
        }).catch(err => window.alert('Network error'))
      }
    },
    deleteTag(tag) {
      api.deleteTag(tag.name).then(res => {
        if (res.success) {
          if (this.tagActive === tag) {
            this.getDraftList()
            this.tagActive = null
          }
          this.tags.$remove(tag)
        }
      })
    },
    blurTag() {
      this.tagActive = null
      this.getDraftList()
    },
    fetchAllTags() {
      api.getAllTags().then(res => {
        if (res.success) {
          res.data.forEach(i => {
            i.newName = ''
            i.editing = false
          })
          this.tags = res.data
          this.getDraftList()
        }
      })
    },
    ...mapActions(['getDraftList'])
  },
  watch: {
    '$route': 'fetchAllTags'
  }
}
</script>

<style lang="stylus">
  @import '../stylus/_settings.styl'
  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
</style>
