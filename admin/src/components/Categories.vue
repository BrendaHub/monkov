<template lang="html">
  <div class="container-with-aside">
    <nav-aside>
    </nav-aside>
    <section class="draft-list-column">
      <h3 class="page-title" style="margin-bottom:0" v-if="tagActive">
        <i class="fa fa-tag icon-font" aria-hidden="true"></i>
        Search By Tag
      </h3>
      <ul class="clearfix reset-list tag-list" v-if="tagActive">
        <li class="tag active">
          <span v-show="!tagActive['editing']">{{tagActive['name']}}</span>
          <i class="fa fa-times iconfont" v-show="!tagActive['editing']" @click="blurTag()"></i>
          <i class="fa fa-pencil iconfont" @click="modifyTag(tagActive)" v-show="!tagActive['editing']"></i>
          <i class="fa fa-trash iconfont" style="vertical-align: 1px;" @click="deleteTag(tagActive)" v-show="!tagActive['editing']"></i>
          <input type="text" class="tag-input" v-if="tagActive['editing']" v-model="tagActive['newName']" placeholder="Enter to submit" @keyup.13="saveTag(tagActive)"></li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
        <li class="tag" v-for="tag in tags"  v-show="tag !== tagActive">
          <span @click="searchTag(tag)" style="cursor:pointer" v-show="!tag['editing']">{{tag['name']}}</span>
        </li>
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
  methods: {
    searchTag(tag) {
      this.tagActive = tag
      this.getAllDrafts({
        tags: tag.id
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
        window.alert(e)
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
        window.alert(e)
      }
    },
    ...mapActions(['getAllDrafts'])
  },
  watch: {
    '$route': 'fetchAllTags'
  },
  mounted() {
    this.fetchAllTags()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../stylus/_settings.styl'
  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
  .fa
    cursor pointer
</style>
