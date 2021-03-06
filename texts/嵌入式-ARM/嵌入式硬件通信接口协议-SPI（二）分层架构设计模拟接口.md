---
layout: blog
title: 嵌入式硬件通信接口协议-SPI（二）分层架构设计模拟接口
date: 2019-02-03 21:40:02
categories: 嵌入式-ARM
tags: [SPI,单片机外设]
---

嵌入式软件分层设计
------------------

嵌入式软件就是某一项目的源码文件集合，源码文件的数量，根据项目复杂程度的不同而有规模和层次的差别。

就拿简单的一个芯片厂商提供的demo来说，代码也会被细分到寄存器操作(Drv层)、板级支持包接口(Bsp层)、功能模块验证(App层)等各层，但是这里的“分层”很多时候都不太明显，因为它仅仅是个demo，所谓的“分层”更多的还是人为给它做的定义。

真正意义的分层，是从代码的编码规范、程序的执行逻辑来体现的。

关于分层设计的意义在这暂不做太多的探讨，只是做个引子，来讲讲SPI接口的设计过程，如何设计一套符合自己规范和方便移植的SPI接口。

SPI在分层架构中的设计思路
-------------------------

刚刚提到分层设计的思路，那么SPI作为一个通信接口，如果按照分层设计的思路，如何把接口设计得更合理，更方便？

此处需要设计的SPI是介于“应用”和“驱动”之间的，“应用”就是项目业务需求的功能模块将数据、数据包等传给SPI接口，而“驱动”是SPI接口拿到数据包后，把数据转变为SPI的时序发送出去。

当我们拿到一款芯片，大多数情况下官方提供的demo程序已经给我们实现好了很多的驱动（或者自己从网络资源中Download），各个接口的驱动，已经被封装成函数或者库供我们直接调用。

想象一下我们的项目工程，如果需要操作芯片硬件接口的时候，直接调用官方提供的接口函数，虽然能实现功能，但是在需要更换芯片平台的时候，就需要在繁杂的、与业务需求相关的应用层里找和去修改为目标驱动接口。

这里就牵扯到了分层设计的优势所在：由于平台的更换，驱动接口已经变了样，那么对代码的移植就会变得非常费力，不仅是脑力活，更是体力活（即使可以批量替换，你也需要仔细核对接口，更要解决接口的差异性）。

而此时如果是分层设计的，在应用和驱动中间有个BSP层，应用层调用的只是BSP层，完全不涉及驱动、寄存器，不涉及与芯片平台相关的接口，那么即使平台怎么更换、驱动怎么改变，你只需要改变BSP层的具体实现，相对就轻松很多了。

从上一篇《[嵌入式硬件通信接口协议-SPI（一）协议基础](https://mp.weixin.qq.com/s/hDUK43s8naybJLvoE2UsoA)》对SPI协议的介绍，设计BSP层的时候，根据SPI可配置项来设计接口功能。设计BSP层的SPI功能函数时考虑接口模式、数据宽度、时钟极性与相位、时钟速率、数据bit位大小端选择、管脚定义。

设计BSP层时，首先想到的是接口初始化和数据收发。设计初始化，把SPI可配置项放在函数接口，作参数传递；设计数据收发，传数据的同时也把SPI端口号作为参数之一，因为我们都知道MCU可能会有多个SPI接口，将SPI端口号作为参数也是比较必要。

SPI接口本身就是可以实现1对N的串行总线，为什么在使用过程中有时要分别使用不同的SPI端口来接不同的外围器件呢？

主要原因是SPI的可配置项的不一致，有些外围器件对SPI时钟信号SCLK的极性要求为高、低不一样，时钟相位不一样，并且通信数据bit位大小端选择的不一样，这些接口配置项的差异，导致了有些场景下操作不同器件时需要使用不同的SPI端口。

SPI时序使用IO引脚仿真
---------------------

从零开始设计自有的一套SPI板级支持包(BSP)接口，那就从初始化开始。这里设计的是模拟SPI，所以会调用GPIO设置的接口。

![](/img/blog_pic/【硬件电路】嵌入式硬件通信接口协议-SPI（二）分层架构设计模拟接口/d27e4d8384bfdb110bb4217179307579.png)

当前使用的芯片平台是STM32F103系列，虽然此时已经完全可以调用官方的StdPeriphDrivers
V3.5.0版本的标准外设库。调用接口库不是目的，成为“调库侠”其实很简单。此处重新写的模拟实现方式，旨在说明在BSP层，实现自有系统的软件架构，为系统集成提供底层接口。同时也是在深入学习和了解SPI接口的时序特性。

初始化函数接口里暂时做了SPI端口号、数据宽度、接口时钟模式、数据位优先模式这四个参数，基本上这四个参数已经可以完成对大部分应用需求。在编码初期先不急于填入过多的配置项，首先按照最简单的默认方式编码，保证程序逻辑可以跑通。

其中用到的管脚定义，是在完成原理图或者完成原型机验证时，基本就确定了管脚的使用，因此管脚的定义一般的都是放在BSP层的头文件中。这样更便于移植和开发。

![](/img/blog_pic/【硬件电路】嵌入式硬件通信接口协议-SPI（二）分层架构设计模拟接口/f63cd049d680ba6581f3ac73b15c2910.png)

数据发送时，先写发送一个字节的数据，数据是“踩”着SPI接口时钟信号SCLK的“节拍”逐个bit位发送出去，因此在发送数据的时候也是需要主机操作时钟信号SCLK和数据信号MOSI：

![](/img/blog_pic/【硬件电路】嵌入式硬件通信接口协议-SPI（二）分层架构设计模拟接口/62ee9242ecb2fefc61b299d3c30feb43.png)

SPI的数据发送接口dcbsp_spi_sendbyte函数实现了将1个字节的数据通过GPIO输出，实现了SPI接口的时序，其中关键的是SCLK信号输出、1字节数据的移位输出、SCLK信号做延时输出脉冲。

而发送多数据的接口就可以采用dcbsp_spi_sendbyte函数来逐字节发送完成。

![](/img/blog_pic/【硬件电路】嵌入式硬件通信接口协议-SPI（二）分层架构设计模拟接口/4bba551128e7df2db34e0c0a6ef8d938.png)

另外接收数据的接口，同样参考着字节发送接口的思路，数据的接收过程也是“踩”着SPI接口时钟信号SCLK的“节拍”逐个bit位传输，这个过程主机继续提供SCLK，然后读取MISO信号的电平，再将读到的电平逐bit缓存在一个变量里：

![](/img/blog_pic/【硬件电路】嵌入式硬件通信接口协议-SPI（二）分层架构设计模拟接口/3e5a96e46532792e9e64961cabbd3036.png)

就这样，利用GPIO进行电平的输出的读取，实现了SPI接口的部分时序。这些接口的内部实现过程，因人而异、因平台变化而微调，但是对外接口不动，对上层应用来说，这就是同一个接口同一个东西，上层的应用层程序改动就很小了。

对于每次移植，BSP层提供了一定架构接口，层次清晰改动小，所以对于一个嵌入式开发者而言，写好BSP层也很重要。

总结，本文主要想分享的是设计嵌入式软件时，分出BSP层，作为应用和驱动的中间层，以便于在项目移植过程中，应用的完美匹配。文中的代码未完，关于驱动类的代码，其执行结果必须在示波器等仪器下观测，仍需确认执行的效率和时序的实现效果！

关于模拟SPI的BSP层完善的设计，敬请期待后文更新！
