export default {
  env : 'development',
  debug : true,
  mongoConfig : {
    url: 'mongoodb://localhost:27017/monkov',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt' : {
    'cert': 'monkov'
  }
}
