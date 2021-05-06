/* =====================================================================
* FileInstructions：butterfly主题友链朋友圈插件js实现文件
* Repository: https://github.com/Akilarlxh/Butterfly_candy_plugins
* Author: Akilarlxh
* Instructions: 仅供自己学习使用，如有需求，还请使用作者原插件
* =====================================================================*/
'use strict'

const pug = require('pug')
const path = require('path')
const urlFor = require('hexo-util').url_for.bind(hexo)
const util = require('hexo-util')

hexo.extend.generator.register('fcircle', function (locals) {

  const config = hexo.config.fcircle || hexo.theme.config.fcircle

  if (!(config && config.enable)) return

  const data = {
    requests_url: urlFor(config.apiurl),                    // api地址
    maxnumber: config.maxnumber ? config.maxnumber : 20,    // 页面展示文章数量
    addnumber: config.addnumber ? config.addnumber : 10,    // 每次加载增加的篇数
    opentype: config.opentype ? config.opentype : "_blank", //'_blank'打开新标签,'_self'本窗口打开
    nofollow: config.nofollow ? config.nofollow : true,     //开启禁止搜索引擎抓取
    preload: config.preload ? urlFor(config.preload) : "",
    error_img: hexo.theme.config.error_img.flink ? urlFor(hexo.theme.config.error_img.flink) : "https://cdn.jsdelivr.net/gh/Zfour/Butterfly-friend-poor-html/friendcircle/404.png",
    fcircle_css: config.css ? urlFor(config.css) : "https://cdn.jsdelivr.net/npm/hexo-qidaink-fcircle@latest/friendscircle/default.css",
    fcircle_js: config.js ? urlFor(config.js) : "https://cdn.jsdelivr.net/npm/hexo-qidaink-fcircle@latest/friendscircle/fcircle.js"
  }
  
  const content = pug.renderFile(path.join(__dirname, './friendscircle/fcircle.pug'), data)

  const pathPre = config.path || 'fcircle'

  let pageDate = {
    content: content
  }

  if (config.front_matter) {
    pageDate = Object.assign(pageDate, config.front_matter)
  }

  return {
    path: pathPre + '/index.html',
    data: pageDate,
    layout: ['page', 'post']
  }
})
