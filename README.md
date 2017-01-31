# Monkov

<center>
  <img src="./intro_src/logo.png" alt="">
</center>

> Monkov is a blog system built with vue.js and koa.js You can easily build up your own blog with it.

## Dependents

- nodejs 6.0 or higher

## Features

- RESTful api
- Front end router
- front and back seperated
- ES6/7 syntax
- Built-in markdown editor
- Add tags and category to your articles

## Modules

### Client

The blog pages on your website.

You can customize the widgets, the themes, the navigation menu and the personal informations.

More features are comming.

#### Demo

![](intro_src/client.png)

#### Tech Stack

- vuejs 2.0 + && vue-router
- fetch
- stylus
- marked

#### Usage

```shell
$ cd client/

$ yarn install

$ npm run dev

$ npm run build
```

--------------------------------------------------------------------------------

### Server

The server of this blog system, built with koa 2.0 and mongoose.

The login module use `jwt`

#### Tech Stack

- koa 2.0
- mongoose
- jwt

#### Usage

```shell
$ cd server/

$ yarn install

$ npm run start
```

--------------------------------------------------------------------------------

### Admin

The background management system. You can write your articles (all called `draft` when not published) here with the built-in markdown editor. You can publish and deleting posts, modifying your tags and categories and all the changes will automatically synchronize to your blog pages.

Initial username:`admin` Initial password:`admin`

#### Demo

![](./intro_src/admin.png)

##### Tech Stack

- vuejs 2.0 + && vue-router && vuex
- fetch
- stylus
- marked && SimpleMDE

##### Usage

```shell
$ cd client/

$ yarn install

$ npm run dev

$ npm run build
```

## Todo List

- [ ] add comments to code
- [ ] comment system
- [ ] category management system
- [ ] customizable themes
- [ ] user management system
- [ ] plugin system
- [ ] customizable header, footer and widgets
- [ ] find a easier way to install and deploy
