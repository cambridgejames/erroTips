# erroTips - 站点目录管理工具
![GitHub](https://img.shields.io/github/license/cambridgejames/erroTips)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cambridgejames/erroTips?label=release)
![GitHub repo size](https://img.shields.io/github/repo-size/cambridgejames/erroTips)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/cambridgejames/erroTips)
![GitHub followers](https://img.shields.io/github/followers/cambridgejames?label=Follow&style=social)
---

**简介：** 本项目可以用于管理多个虚拟网站，提供网站的入口；同时可用于自定义错误代码（如404、500等）的显示。

注：本代码库中的错误代码显示页面来自[https://404.life](https://404.life)

**部署地址：** [http://www.compscosys.cn](http://www.compscosys.cn)

---

# 使用说明
---

### 1. 部署方法（以Apache2.4为例）
1. 在服务器中配置一个新的虚拟站点
2. 将本项目的代码库解压至相应虚拟站点的根目录下
3. 修改服务器的配置文件，将403、404、500等错误的页面指向“站点域名/error/错误代码”
4. 执行“httpd -t”命令，检查配置文件有无语法问题
5. 重启服务器，加载新的配置文件
6. 访问站点所在域名，即可显示在website.php文件中定义的站点列表
7. 访问“站点域名/error/错误代码”，即可显示相应的错误提示页面


### 2. 站点列表显示模块
##### 1. 自定义站点信息
修改"/core/config"目录下的website.php中的“list”项

其中：每一项的key代表了站点的目标网址，method为站点的协议，icon为站点的图标，title为站点名称，view为站点简介

需要注意的是，该文件使用PHP中的array语法定义错误代码和对应描述之间的关系。


### 3. 错误代码显示模块
##### 1. 自定义错误提示页面
修改"/static/views"目录下的errors.twig

其中：错误代码使用"{{ code }}"代替，错误描述用"{{ text }}"代替。

注意：页面模板文件必须遵循twig语法规范。

##### 2. 自定义错误提示代码和描述
修改"/core/config"目录下的error.php

需要注意的是，该文件使用PHP中的array语法定义错误代码和对应描述之间的关系。


# 版本更新
---
### V1.02.0924
1. 新增站点目录显示模块
2. 修复了更改错误代码显示模块的页面模板文件后模块加载异常的问题

### V1.01.0923
1. 将错误代码显示模块的页面模板文件更改为twig文件

### V1.01.0922
1. 新增错误代码显示模块
2. 将项目中所有未捕获并处理的异常重定向至错误代码显示模块


# 开发文档
---

### 1. 开发环境
+ PHP 7.2.7
+ Windows 10 Version 1903
+ composer 1.8.4


# 版本仓库
---
[GitHub: https://github.com/cambridgejames/erroTips](https://github.com/cambridgejames/erroTips)

本项目遵循MIT开源许可协议，详情请见LICENSE文件
