<template lang="html">
  <div><textarea id="editor" cols="30" rows="10"></textarea></div>
</template>

<script>
// import md2html from 'src/markdown'
// import SimpleMDE from 'simplemde'
// let smde
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      markdown: this.content
    }
  },
  mounted () {
    // smde = new SimpleMDE({
    //   initialValue: this.content,
    //   autoDownloadFontAwesome: false,
    //   element: document.getElementById('editor'),
    //   previewRender: str => md2html(str),
    //   spellChecker: false,
    //   toolbar: ['code', 'heading'],
    //   showIcons: ['code']
    // })
  }
}
</script>

<style lang="css">
#editor {
    opacity: 0
}
</style>
