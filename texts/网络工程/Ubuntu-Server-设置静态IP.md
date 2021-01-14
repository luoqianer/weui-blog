---
title: Ubuntu-Server 设置静态IP
categories: 网络工程
tags: [LAMP, WebSite]
description: 关于如何在ubuntu server 14.04 LTS操作系统的虚拟机环境下配置服务器为静态IP
date: 2018-05-22 21:22:27
---
#虚拟机VM 12软件的配置


![“虚拟机VM12软件配置Ubuntu系统网络连接方式”](/img/blog_pic/虚拟机VM12软件配置Ubuntu系统网络连接方式.png)

#配置静态ip地址:
$ sudo vim /etc/network/interfaces
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
