/* =====================================================================
* FileInstructions：butterfly主题友链朋友圈插件js实现文件
* Repository: https://github.com/Akilarlxh/Butterfly_candy_plugins
* Author: Akilarlxh
* Modify: qidaink
* Instructions: 仅供自己学习使用，如有需求，还请使用作者原插件
* =====================================================================*/
'use strict'

//butterfly主题友链朋友圈加载，,参数在站点配置文件中设置或者主题配置文件
if (hexo.config.theme == 'butterfly' ){
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
}
//NexT主题友链朋友圈加载,参数在站点配置文件中设置
else if(hexo.config.theme == 'next'){

  if( hexo.config.fcircle.enable == false ){
    return;
  }
  /*---------------------------------------------------------------------*/
  //设置 fcircle 默认值
  hexo.config.fcircle = Object.assign({
    requests_url: "",   // api地址
    maxnumber: 20,      // 页面展示文章数量
    addnumber: 10,      // 每次加载增加的篇数
    opentype: "_blank", //'_blank'打开新标签,'_self'本窗口打开
    nofollow: true,     //开启禁止搜索引擎抓取
    preload: "",        //加载图片链接
    error_img: "https://cdn.jsdelivr.net/npm/hexo-qidaink-fcircle@latest/images/friends_404.gif",
    fcircle_css: "https://cdn.jsdelivr.net/npm/hexo-qidaink-fcircle@latest/friendscircle/default.css",
    fcircle_js: "https://cdn.jsdelivr.net/npm/hexo-qidaink-fcircle@latest/friendscircle/fcircle.js",
    fcircle_custom_css: "", // 添加的是朋友圈文章的样式，只有next需要
    pjax: "data-pjax"   // 默认开启pjax

  }, hexo.config.fcircle);
  
  const fcircle = hexo.config.fcircle;
  const Util = require('@next-theme/utils');  /* 本地加载需安装依赖：npm install @next-theme/utils */
  const nunjuck = require('nunjucks')
  const utils = new Util(hexo, __dirname);
  
  const content_njk = nunjuck.render(utils.getFilePath('friendscircle/fcircle.njk'), fcircle)  /* 传入参数到fcircle.njk模板文件 */

  let pageData = {
    content: content_njk
  }
  
  if (fcircle.front_matter) {
    pageData = Object.assign(pageData, fcircle.front_matter)
  }

  hexo.extend.generator.register('fcircle', function(locals){
    return {
      path: 'friendscircle/index.html',
      data: pageData,
      layout: ['page', 'index']
    }
  });

}