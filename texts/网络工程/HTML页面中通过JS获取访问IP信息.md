---
title: HTML页面中通过JS获取访问IP信息
categories: 网络工程
tags: [WebSite,FRONT-END,HTML]
description: 关于如何在HTML静态页面中调用JS获取访问IP信息
date: 2018-06-20 08:33:22
---

搜狐IP地址查询接口（默认GBK）：http://pv.sohu.com/cityjson

搜狐IP地址查询接口（可设置编码）：http://pv.sohu.com/cityjson?ie=utf-8

-搜狐另外的IP地址查询接口：http://txt.go.sohu.com/ip/soip

-百度静态资源库：http://cdn.code.baidu.com/

x新浪的IP地址查询接口：http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js

x新浪多地域方法：http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=0.0.0.0

【以上接口并非完全可用，截止博文编辑当日，后两个带x的不可使用】


#在HTML页面中调用JS获取访问IP信息

```
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>

<script type="text/javascript">

	document.write(returnCitySN["cip"]+','+returnCitySN["cname"])

</script>

```