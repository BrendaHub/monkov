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
      <draft-editor v-if="currentId"></draft-editor>
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
      this.getAllDrafts({
        tags: tag.name
      }) //or tag
    },
    modifyTag(tag) {
      tag.newName = tag.name
      tag.editing = true
    },
    async saveTag(tag) {
      if (tag.name === tag.newName || !tag.newName) {
        tag.editing = false
        return
      }
      try {
        const res = await api.modifyTag(tag.name, tag.newName)
        if (res.success) {
          tag.name = tag.newName
          tag.editing = false
        } else window.alert('Tag duplicated')
      } catch (e) {
        window.alert('Network error')
      }
    },
    async deleteTag(tag) {
      const res = await api.deleteTag(tag.name)
      if (res.success) {
        if (this.tagActive === tag) {
          this.getAllDrafts()
          this.tagActive = null
        }
        this.tags.splice(this.tags.indexOf(tag), 1)
      }
    },
    blurTag() {
      this.tagActive = null
      this.getAllDrafts()
    },
    async fetchAllTags() {
      try {
        const res = await api.getAllTags()
        if (res.success) {
          res.data.forEach(i => {
            i.newName = ''
            i.editing = false
          })
          this.tags = res.data
          this.getAllDrafts()
        }
      } catch (e) {
        window.alert('Network error')
      }
    },
    ...mapActions(['getAllDrafts'])
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
