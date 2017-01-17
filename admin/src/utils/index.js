export default {
  _debounce(func, wait, immediate = false) {
    let _timestamp
    let _timer
    if (immediate) {
      return function() {
        let now = Date.now()
        if (_timestamp && now - _timestamp < wait) {
          _timestamp = now
          return
        }
        _timestamp = now
        func.apply(this, arguments)
      }
    }
    return function() {
      let now = Date.now()
      _timestamp && now - _timestamp < wait && clearTimeout(_timer)
      _timestamp = now
      _timer = setTimeout(func.bind(this, ...arguments), wait)
    }
  },
  trim(str) {
    return str.replaceAll(/(^\s*)|(\s*$)/g, '')
  }
}
