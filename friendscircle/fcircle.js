/* =====================================================================
* FileInstructions：butterfly主题友链朋友圈js文件
* Repository: https://github.com/Akilarlxh/Butterfly_candy_plugins
* Author: Akilarlxh
* Instructions: 仅供自己学习使用，如有需求，还请使用作者原插件
* =====================================================================*/

/* 处理数据 */
var orign_data = []; /* api请求所得到的源数据 */

if (document.getElementById('friend_link_circle')) {

  var loading_pic = document.getElementById('friend_link_circle');    /* 添加加载动画 */

  /* 判断preload值是否为空 */
  if(typeof preload == "undefined" || preload == null || preload === "") {
    loading_pic.innerHTML = '<span id="moments_loading" style="text-align: center;"><div class="loader"></div></span>';
  } 
  else{
    loading_pic.innerHTML = `<span id="moments_loading" style="text-align: center;"><img src="${ preload }" alt="loading......"></span>`;
  }

  fetch(requests_url).then(
    data => data.json()
  ).then(
    data => {
      orign_data = data;
      data_handle(nofollow, orign_data, maxnumber)
    }
  )
}

var data_handle = (nofollow, data, maxnumber) => {
  var today = todaypost();
  var Datetody = new Date(today);
  for (var item = 0; item < data[1].length; item++) {
    var Datedate = new Date(data[1][item][1]);
    if (Datedate > Datetody) {
      data[1].splice(item--, 1);
    }
  }
  var today_post = 0;
  var error = 0;
  var unique_live_link;
  var datalist = data[1].slice(0, maxnumber);
  var listlenth = data[1].length;
  var user_lenth = data[0].length;
  var datalist_slice = slice_month(datalist);
  var last_update_time = timezoon(datalist_slice);
  var link_list = [];
  for (var item of data[1]) {
    if (item[1] === today) {
      today_post += 1;
    }
    link_list.push(item[3]);
  }
  var arr = unique(link_list);
  unique_live_link = arr.length;
  for (var item of data[0]) {
    if (item[3] === 'true') {
      error += 1;
    }
  }
  /* ------------------------------- 统计表 ------------------------------- */
  /* ------ 统计表开始 ----- */
  var html_item = '<div class="article-sort-title">统计信息</div>';
        html_item += '<div class="article-sort">';
          html_item += '<div id="info_user_poor">';
            html_item += '<div class="chart">';
              html_item += '<span class="friend_post_info_title">当前友链数:</span>';
              html_item += `<span class="friend_post_info_number">${ user_lenth }个</span>`;
              html_item += '<br>';
              html_item += '<span class="friend_post_info_title">链接失败数:</span>';
              html_item += `<span class="friend_post_info_number">${ error }个</span>`;
              html_item += '<br>';
            html_item += '</div>';
            html_item += '<div class="chart">';
              html_item += '<span class="friend_post_info_title">活跃友链数:</span>';
              html_item += `<span class="friend_post_info_number">${ unique_live_link }个</span>`;
              html_item += '<br>';
              html_item += '<span class="friend_post_info_title">当前文章数:</span>';
              html_item += `<span class="friend_post_info_number">${ listlenth }篇</span>`;
              html_item += '<br>';
            html_item += '</div>';
            html_item += '<div class="chart">';
              html_item += '<span class="friend_post_info_title">今日更新:</span>';
              html_item += `<span class="friend_post_info_number">${ today_post }篇</span>`;
              html_item += '<br>';
              html_item += '<span class="friend_post_info_title">最近更新:</span>';
              html_item += `<span class="friend_post_info_number">${ last_update_time }</span>`;
            html_item += '</div>';
          html_item += '</div>';
        html_item += '</div>';
        html_item += '<hr>';
/* ------ 统计表结束 ----- */

  for (var month_item of datalist_slice) {
    /* 月份划分 */
    html_item += `<div class="article-sort-title">${month_item[0]}</div>`;
    html_item += '<div class="article-sort">';
      /* ------ 更新文章循环节 ------ */
      for (var post_item of month_item[1]) {
        var rel = '';
        if (nofollow && opentype == '_blank') {
          rel = 'noopener nofollow';
        } else if (nofollow) {
          rel = 'nofollow';
        } else if (opentype == '_blank') {
          rel = 'noopener';
        } else {
          rel = '';
        }
        /* ------ 正文主题开始 ----- */
        html_item += '<div class="article-sort-item">';
          html_item += `<a class="article-sort-item-img" target="${opentype}" href="${post_item[2]}" title="${post_item[0]}" rel="${rel}">`;
            //----图片失效链接替换-----
            html_item += `<img onerror=this.onerror=null;this.src="${error_img}" data-ll-status='loaded' src="${post_item[4]}" class="entered loaded">`;
          html_item += '</a>';
          html_item += '<div class="article-sort-item-info">';
            html_item += `<a target="${opentype}" href="${post_item[2]}" title="${post_item[0]}" rel="${rel}">${post_item[0]}</a>`;
            html_item += '<div class="article-sort-item-time">';
              html_item += '<i class="far fa-user"></i>';
              html_item += `<span>${post_item[3]}</span>`;
              html_item += '<div class="friend_post_time">';
                html_item += '<i class="far fa-calendar-alt"></i>';
                html_item += `<time datetime="${post_item[1]}" title="${post_item[1]}">${post_item[1]}</time>`;
              html_item += '</div>';
            html_item += '</div>';

          html_item += '</div>';
        html_item += '</div>';
        /* ------ 正文主题结束 ----- */
      }
      /* ------ 更新文章循环节结束 ----- */
    html_item += '<div>';
  }
  /* ------ 加载更多按钮 ----- */
  if (data[1].length - maxnumber > 0) {
    html_item += '<div style="text-align: center;"><button type="button" style="background: var(--btn-bg);color: var(--btn-color);width: fit-content;margin: 0 auto;font-size: 20px;font-weight: bolder;border-radius: 13px;padding: 8px 51px;" onclick="load_more_post()">加载更多...</button></div>'
  }

  var friend_link_circle = document.getElementById('friend_link_circle');
  append_div(friend_link_circle, html_item)
};

var load_more_post = () => {
  if (document.getElementById('friend_link_circle')) {
    maxnumber = maxnumber + addnumber;
    document.getElementById('friend_link_circle').innerHTML = "";
    data_handle(nofollow, orign_data, maxnumber)
  }
};

/* 加载更多文章 */
/* 将html放入指定id的div容器 */
var append_div = (parent, text) => {
  /* 检测到主体容器以后将加载动画内容置空 */
  if (document.getElementById('friend_link_circle')) {
    loading_pic.innerHTML = ``;
  };
  if (typeof text === 'string') {
    var temp = document.createElement('div');
    temp.innerHTML = text;
    /* 防止元素太多 进行提速 */
    var frag = document.createDocumentFragment();
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    parent.appendChild(frag);
  } 
  else {
    parent.appendChild(text);
  }
};

/* 去重 */
var unique = (arr) => {
  return Array.from(new Set(arr))
};

/* 时区优化 */
var formatDate = (strDate) => {
  try {
    var date = new Date(Date.parse(strDate.replace(/-/g, "/")));
    var gettimeoffset;
    if (new Date().getTimezoneOffset()) {
      gettimeoffset = new Date().getTimezoneOffset();
    } else {
      gettimeoffset = 8;
    }
    var timeoffset = gettimeoffset * 60 * 1000;
    var len = date.getTime();
    var date2 = new Date(len - timeoffset);
    var sec = date2.getSeconds().toString();
    var min = date2.getMinutes().toString();
    if (sec.length === 1) {
      sec = "0" + sec;
    }
    if (min.length === 1) {
      min = "0" + min;
    }
    return date2.getFullYear().toString() + "/" + (date2.getMonth() + 1).toString() + "/" + date2.getDate().toString() + " " + date2.getHours().toString() + ":" + min + ":" + sec
  } 
  catch (e) {
    return ""
  }
};

var timezoon = (datalist_slice) => {
  var time = datalist_slice[0][1][0][5];
  return formatDate(time)
};

/* 今日时间 */
var todaypost = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString();
  var day = (date.getDate()).toString();
  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day
};

/* 月份切片 */
var slice_month = (data) => {
  var monthlist = [];
  var datalist = [];
  var data_slice = data;
  for (var item in data_slice) {
    data_slice[item].push(item);
    if (data_slice[item][1].lenth !== 10) {
      var list = data_slice[item][1].split('-');
      if (list[1].length < 2) {
        list[1] = "0" + list[1]
      }
      if (list[2].length < 2) {
        list[2] = "0" + list[2]
      }
      data_slice[item][1] = list.join('-')
    }
    var month = data_slice[item][1].slice(0, 7);
    if (monthlist.indexOf(month) !== -1) {
      datalist[monthlist.length - 1][1].push(data_slice[item])
    } else {
      monthlist.push(month);
      datalist.push([month, [data_slice[item]]])
    }
  }
  for (var mounthgroup of datalist) {
    mounthgroup.push(mounthgroup[1][0][6]);
  }
  return datalist
};
