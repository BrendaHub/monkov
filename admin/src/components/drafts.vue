<template lang="html">
  <div class="container-with-aside">
    <nav-aside></nav-aside>
    <section class="draft-list-column">
      <h3 class="page-title">
        <i class="fa fa-file-text icon-font" aria-hidden="true"></i>
        Draft List
        <i class="fa fa-plus draft-add" @click="newDraft" aria-hidden="true">
      </h3>
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
  components: {
    NavAside,
    DraftEditor,
    DraftList
  },
  computed: { ...mapGetters(['saved', 'titleSaved', 'currentId'])
  },
  methods: { ...mapActions(['getAllDrafts', 'createDraft']),
    newDraft() {
      if (this.saved && this.titleSaved) this.createDraft()
      else window.alert('Current draft is saving, please try again')
    }
  },
  watch: {
    '$route': 'getAllDrafts'
  },
  mounted() {
    this.getAllDrafts()
  }
}
</script>

<style lang="stylus">
  @import '../stylus/simplemde.styl'
  @import '../stylus/_settings.styl'
  .container-with-aside
    margin-left 70px
    height 100%
  .draft-list-column
    float left
    border-right 1px solid $border
    height 100%
    width:30%
    max-width 300px
    overflow-y auto
  .draft-add
    cursor pointer
    float right
    margin-right 20px
  .page-title
    color $light
    padding-left 25px
    font-weight 600
    letter-spacing 2px
    .icon-font
     font-size:16px
     transform:translateY(-3px)
  .draft-edit
    overflow auto
    height 100%
</style>
