export default {
  bind : function(el, binding, vnode) {
    window.addEventListener("scroll", binding.value)
  },
  unbind : function() {
    window.removeEventListener("scroll", binding.value)
  }
}
