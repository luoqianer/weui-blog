---
title: LAMP服务器PHP文件中调用simplexml_load_string函数失效问题
categories: 网络工程
tags: [LAMP, WebSite]
description: 关于
date: 2018-05-27 12:48:51
---
##1.首先查看模块加载情况
确认列表中是否有SimpleXML，列表如下（其他暂时不管有无，先关注SimpleXML）


```
digcore@bogon:~$ php -m
[PHP Modules]
calendar
Core
ctype
curl
date
dom
exif
fileinfo
filter
ftp
gettext
hash
iconv
json
libxml
mbstring
mysqli
mysqlnd
openssl
pcntl
pcre
PDO
pdo_mysql
Phar
posix
readline
Reflection
session
shmop
SimpleXML
sockets
SPL
standard
sysvmsg
sysvsem
sysvshm
tokenizer
wddx
xml
xmlreader
xmlwriter
xsl
Zend OPcache
zlib

[Zend Modules]
Zend OPcache
```

# 2.没有的话执行安装
```
sudo apt install php-mbstring php7.0-mbstring php-gettext
```
或

```
sudo apt-get install php7.0-xml
```


# 3.之后重启
```
sudo reboot
```
