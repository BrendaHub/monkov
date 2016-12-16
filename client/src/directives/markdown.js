import markdown from 'src/markdown'
export default {
  bind : (el, biding, vnode) => {
    el.innerHTML = markdown(biding.value)
  },
  update : (el, biding, vnode) => {
    el.innerHTML = markdown(biding.value)
  }
}
