---
title: git命令-add警告
categories: 开发工具
tags: [git]
description: 在使用git add .命令时，出现了警告
date: 2018-03-30 13:00:49
---


## 使用场景
在正常的操作中，将本地文件进行修改后，欲将其提交，但git bash弹出如下警告：

	warning: LF will be replaced by CRLF in <file-name>.
	The file will have its original line endings in your working directory.

翻译：

	警告：<file-name>文件中的LF（LineFeed，中文意思是换行）将会被替换成CRLF（CarriageReturn LineFeed，中文意思是回车换行）。

	在工作区里，这个文件会保持它原本的行结束符

## 问题原因
在不同的操作系统平台中，对换行符的定义不同。对比三大主流平台的换行符：

	Uinx/Linux:	LF(LinFeed)
	
	Windows: CRLF（CarriageReturn LineFeed)
	
	Mac OS : CR(CarriageReturn)

## 配置方法
查看配置： git config core.autocrlf
设置指令： git config --global core.autocrlf true

其可配置参数有三个：

``` bash

为true时，Git会将你add的所有文件视为文本问价你，将结尾的CRLF转换为LF，而checkout时会再将文件的LF格式转为CRLF格式。

为false时，line endings不做任何改变，文本文件保持其原来的样子。

为input时，add时Git会把CRLF转换为LF，而check时仍旧为LF，所以Windows操作系统不建议设置此值。

```





以上有参考(https://www.zhihu.com/question/50862500/answer/123197258)