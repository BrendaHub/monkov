export default[
  {
    path : '/',
    component : resolve => require(['components/Home'], resolve)
  }, {
    path : '/posts',
    component : resolve => require(['components/Blog'], resolve)
  }, {
    path : '/about',
    component : resolve => require(['components/About'], resolve)
  }, {
    path : '/photograph',
    component : resolve => require(['components/Photograph'], resolve)
  }
]
