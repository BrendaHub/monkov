# Monkov

<center>
  <img src="./intro_src/logo.png" alt="">
</center>

> Monkov is a blog system built with vue.js and koa.js You can easily build up your own blog with it.

## Requirements

- nodejs 6.0 or higher
- mongodb installed

## Features

- RESTful api
- Front end router
- Front and back separated
- ES6/7 syntax
- Built-in markdown editor
- Add tags and category to your articles

## Modules

### Client

The blog pages on your website.

You can customize the widgets, the themes, the navigation menu and the personal information.

More features are coming.

#### Screen Shot

![](intro_src/client.png)

#### Tech Stack

- vuejs 2.0 + && vue-router
- fetch
- stylus
- marked

#### Run

```shell
# install dependencies
$ yarn install

# run dev
$ npm run dev-client

# build
$ npm run build-client
```

--------------------------------------------------------------------------------

### Server

The server of this blog system, built with koa 2.0 and mongoose.

The login module use `jwt`

#### Tech Stack

- koa 2.0
- mongoose
- jwt

#### Run

```shell
# run development
$ npm run dev-server

# run production
$ npm run pro-server
```

--------------------------------------------------------------------------------

### Admin

The background management system. You can write your articles (all called `draft` when not published) here with the built-in markdown editor. You can publish and deleting posts, modifying your tags and categories and all the changes will automatically synchronize to your blog pages.

Initial username:`admin` Initial password:`admin`

#### Screen Shot

![](./intro_src/admin.png)

##### Tech Stack

- vuejs 2.0 + && vue-router && vuex
- fetch
- stylus
- marked && SimpleMDE

##### Run

```shell
# run dev
$ npm run dev-admin

# build
$ npm run build-admin
```

## Todo List

- [ ] CSS refactor
- [ ] Comment system
- [ ] Category management
- [ ] Customizable themes
- [ ] User management system
- [ ] Plugin system
- [ ] Customizable header, footer and widgets
