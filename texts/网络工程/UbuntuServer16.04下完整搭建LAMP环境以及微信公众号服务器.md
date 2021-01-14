---
title: UbuntuServer16.04下完整搭建LAMP环境以及微信公众号服务器
categories: 网络工程
tags: [LAMP, WebSite]
description: 关于如何在UbuntuServer16.04下完整搭建LAMP环境以及微信公众号服务器
date: 2018-05-27 12:56:34
---
```
以下的所有对树莓派系统操作，均在MobaXterm Personal Edition工具下进行。
```

# 一、	官网下载镜像（VM虚拟机环境下推荐32位系统）
```
页面下载 Ubuntu 16.04 Server (32-bit) http://www.ubuntu.org.cn/download/alternative-downloads

VM根据ISO文件创建虚拟机
```


# 二、	虚拟机设置
1.首选项设置虚拟机可后台运行

![“虚拟机VM12软件配置Ubuntu系统网络连接方式”](/img/blog_pic/虚拟机首选项设置后台运行系统.png)

2.虚拟机设置网络连接为桥接模式
![“虚拟机VM12软件配置Ubuntu系统网络连接方式”](/img/blog_pic/虚拟机VM12软件配置Ubuntu系统网络连接方式.png)

# 三、	安装基础软件
```
sudo apt-get install vim
```

# 四、	安装环境软件
```
sudo apt-get update #更新
sudo apt-get install mysql-server mysql-client #安装MySQL
sudo apt-get install apache2 
sudo apt-get install php
sudo apt-get install php-mysql
sudo apt-get install php7.0-curl	#解决了curl_init();未定义问题
sudo apt-get install php7.0-xml		#解决了simplexml_load_string();未定义问题
```

# 五、	配置所搭建的环境

1.设置静态IP,打开文件进行编辑
```
$ sudo vim /etc/network/interfaces
```

原有内容只有如下两行：

```
auto lo
iface lo inet loopback
```

向末尾追加以下内容：

```
auto eth0
iface eth0 inet static
address 192.168.1.5    #IP地址
gateway 192.168.1.1    #网关
netmask 255.255.255.0  #网络掩码
network 192.168.1.0    #网络地址
broadcast 192.168.1.255  #广播

dns-nameservers 192.168.1.1 8.8.8.8 
```

2.打开PHP配置该文件，设置相关的错误显示、文件操作范围

```
vim /etc/php/7.0/apache2/php.ini
```

# 六、	重启生效

```
sudo service mysql restart
sudo service apache2 restart
```

#七、	放入网站文件
1.从本地拷贝网站文件index.php到服务器的指定目录下：

```
cd /mnt/e/Software/WebServer/
scp index.php pi@192.168.1.200:/var/www/html/
```

2.设置网站文件属性

```
sudo chmod 777 index.php  	#使index.php有读写的权限
```

3.设置相应的读写权限（如index.php中文件读写操作时，保证所操作的目录为777权限）


#八、	模拟访问服务器主页



# 九、	配置内网穿透（或者路由映射）

```
下载花生壳(http://service.oray.com/question/2680.html)内网穿透工具，根据该官网完成映射设置。
	(新推荐: https://www.zhihu.com/question/49629610)
```

# 十、	配置微信公众号

```
如果主机服务器下有多个网站或者后台的文件夹，则微信的URL配置中，务必将文件夹名字后面的"/"（斜杠符号）带上！
 ```

# 十一、	消息记录

