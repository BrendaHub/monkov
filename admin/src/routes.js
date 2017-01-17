export default[
  {
    path : '/drafts',
    component : resolve => require(['components/drafts'], resolve)
  }, {
    path : '/tags',
    component : resolve => require(['components/Tags'], resolve)
  },
  //  {
  //   path : '/categories',
  //   component : resolve => require(['components/Categories'], resolve)
  // },
  {
    path : '/login',
    component : resolve => require(['components/Login'], resolve)
  }
]
