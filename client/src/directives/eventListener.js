export default event => {
    return {
        bind :(el,binding,vnode)=>{
            window.addEventListener(event, binding.value)
        },
        unbind : () => {
            window.removeEventListener(event, binding.value)
        }
    }
}