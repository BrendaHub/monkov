import Home from 'components/Home.vue'
import Blog from 'components/Blog.vue'
import About from 'components/About'
import Photograph from 'components/Photograph'
export default[
  {
    path : '/',
    component : Home
  }, {
    path : '/blog',
    component : Blog
  }, {
    path : '/about',
    component : About
  }, {
    path : '/photograph',
    component : Photograph
  }
]
