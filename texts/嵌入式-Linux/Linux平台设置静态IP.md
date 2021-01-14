---
title: Linux平台设置静态IP
categories: 嵌入式-Linux
tags: [Embed, Linux]
description: 关于如何在各个Linux平台下设置静态IP的方法
date: 2018-05-27 12:28:36
---
# 一.树莓派


编辑文件
```
vim /etc/dhcpcd.conf
```

```
interface wlan0                         #网口号，或eth0网口
static ip_address=192.168.1.200/24      #静态IP，最后必须加/24
static routers=192.168.1.1              #路由
static domain_name_servers=192.168.1.1  #网关
```

# 二.Ubuntu server 16.04
## 1通过指令查看网卡名称
```
digcore@bogon:~$ ifconfig
ens33     Link encap:Ethernet  HWaddr 00:0c:29:09:d7:1d
          inet addr:192.168.1.55  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fe80::20c:29ff:fe09:d71d/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:2020 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1584 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:250191 (250.1 KB)  TX bytes:275703 (275.7 KB)
          Interrupt:19 Base address:0x2000

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:738 errors:0 dropped:0 overruns:0 frame:0
          TX packets:738 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:167825 (167.8 KB)  TX bytes:167825 (167.8 KB)
```

## 2编辑网卡配置文件
```
sudo vim /etc/network/interfaces
```

配置信息改成如下

```
auto ens33
iface ens33 inet static
address 192.168.1.55
gateway 192.168.1.1
netmask 255.255.255.0
network 192.168.1.0
broadcast 192.168.1.255
dns-nameservers 192.168.1.1 8.8.8.8
```

## 3编辑DNS服务器配置

```
sudo vim /etc/resolv.conf
```

增加如下内容

```
dns-nameservers 202.96.209.133
dns-nameservers 8.8.8.8
```

## 4重启网络服务就好了
```
service networking restart
```