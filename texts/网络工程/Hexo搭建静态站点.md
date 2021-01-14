---
title: Hexo搭建静态站点
categories: 网络工程
tags: [WebSite]
description: 关于Hexo开源项目创建的静态博客网站教程
date: 2018-03-30 17:01:24
---

博客主页:[(https://blog.digcore.cn](https://blog.digcore.cn)

# 1.安装软件

## 安装git bash

国内CSDN资源站下载地址：

	https://download.csdn.net/download/digcore/10320757

## 安装Python2

国内CSDN资源站下载地址：
	
	https://download.csdn.net/download/digcore/......

留意需要添加到系统的环境变量中，如下图

![“设置Python环境变量”](/img/blog_pic/设置Python环境变量.png)

## 安装hexo

	sudo npm install -g hexo-cli
	
	hexo -v	// 查看版本, 有版本号代表成功

# 2.创建站点

	hexo init SiteName

# 3.配置站点

对站点根文件夹下的_config.yaml文件进行配置

# 4.生成站点

	hexo g

# 5.开启hexo内嵌服务器

	hexo s

# 6.查看效果
打开主页
	
	http://127.0.0.1:4000