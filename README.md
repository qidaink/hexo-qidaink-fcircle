# 自用`butterfly`友链朋友圈插件

&emsp;&emsp;本插件仅为方便自己学习使用(本想好好学习一番，可惜，没看懂，心态就很崩😭)，如有需求，还请使用原作者插件。

<table>
    <tr>
        <td align="center">参考项目</td>
        <td align="center">项目地址</td>
    </tr>
    <tr>
        <td align="left">Akilarlxh/Butterfly_candy_plugins</td>
        <td align="left"><a href="https://github.com/Akilarlxh/Butterfly_candy_plugins/tree/master/hexo-butterfly-fcircle" target="_blank">https://github.com/Akilarlxh/Butterfly_candy_plugins/tree/master/hexo-butterfly-fcircle</td>
    </tr>
</table>

# hexo-butterfly-fcircle

给`hexo-theme-butterfly`添加 [友链朋友圈](https://akilar.top/posts/8480b91c/)

# 安装

1. 安装插件，在博客根目录`[Blogroot]`下打开终端，运行以下指令：
    ```bash
    npm install hexo-butterfly-fcircle --save
    ```

2. 添加配置信息
  在站点配置文件`_config.yml`或者主题配置文件`_config.butterfly.yml`中添加

  ```yaml
    # fcircle
    # see https://zfe.space/friendcircle/
    # see https://akilar.top/posts/8480b91c/
    fcircle:
      enable: true #控制开关
      apiurl: https://hexo-circle-of-friends-api.vercel.app/api #api地址
      maxnumber: 20 #【可选】页面展示文章数量
      addnumber: 10 #【可选】每次加载增加的篇数
      opentype: '_blank' #【可选】'_blank'打开新标签,'_self'本窗口打开,默认为'_blank'
      nofollow: true #【可选】开启禁止搜索引擎抓取,默认开启
      preload: #【可选】加载动画图片链接
      css: #【可选】开发者接口，自定义css链接
      js: #【可选】开发者接口，自定义js链接
      path: #【可选】fcircle的路径名称。默认为 fcircle，生成的页面为 fcircle/index.html
      front_matter: #【可选】fcircle页面的 front_matter 配置
        title: 朋友圈
        comments: false
  ```
3. 参数释义

  |参数|备选值/类型|释义|
  |:--|:--|:--|
  |enable|true/false|控制开关|
  |apiurl|URL|api链接，配置教程参看[基于 hexo 的友链朋友圈](https://zfe.space/friendcircle/)|
  |maxnumber|number|【可选】填写阿拉伯数字，页面展示文章数量，默认20|
  |addnumber|number|【可选】填写阿拉伯数字，每次加载增加的篇数，默认10|
  |opentype|'_blank''_self' |【可选】'_blank'新标签打开,'_self'本窗口打开,默认为'_blank'|
  |nofollow| true/false |【可选】开启禁止搜索引擎抓取,默认开启|
  |preload| URL|【可选】加载动画图片链接|
  |css| URL|【可选】开发者接口，自定义css链接|
  |js| URL|【可选】开发者接口，自定义js链接|
  |path| string|【可选】字符串，fcircle的路径名称。默认为 fcircle，生成的页面为 fcircle/index.html|
  |front_matter|object|【可选】写法见上文示例，fcircle页面的 front_matter 配置|

