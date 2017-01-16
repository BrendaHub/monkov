export default[
  {
    path : '/drafts',
    component : resolve => require(['components/draftList'], resolve)
  }, {
    path : '/tags',
    component : resolve => require(['components/TagList'], resolve)
  }, {
    path : '/categories',
    component : resolve => require(['components/Categorylist'], resolve)
  }
]
