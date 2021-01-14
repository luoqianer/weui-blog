---
title: Linux平台设置系统时区
categories: 嵌入式-Linux
tags: [Embed, Linux]
description: 关于
date: 2018-05-27 12:43:49
---
# 一.直接更改配置文件
```
sudo  nano  /etc/timezone
```

把里面所有文字删除了，然后添加

```
Asia/Chongqing 
```

然后按ctrl + x保存即可，如果不行，可以reboot一下系统 


# 二.调出时区选择界面选择
```
sudo dpkg-reconfigure tzdata 
```

回车后会看见选择界面，先选择Asia然后再选择Chongqin即可
