# erroTips
---

**简介：**本项目可以用于管理多个虚拟网站，提供网站的入口；同时可用于自定义错误代码（如404、500等）的显示。
注：本代码库中的错误代码显示页面来自[https://404.life](https://404.life)

**部署地址：**[http://www.compscosys.cn](http://www.compscosys.cn)
---

# 使用说明
---

### 1. 错误代码显示模块
##### 1. 自定义错误提示页面
修改"/static/views"目录下的errors.html

其中：错误代码使用"{{ code }}"代替，错误描述用"{{ text }}"代替。

##### 2. 自定义错误提示代码和描述
修改"/core/config"目录下的error.php

需要注意的是，该文件使用PHP中的array语法定义错误代码和对应描述之间的关系。


# 版本更新
---
### V1.01.0922
1. 新增错误代码显示模块
2. 将项目中所有未捕获并处理的异常重定向至错误代码显示模块


# 开发文档
---

### 1. 开发环境
+ PHP 7.2.7
+ Windows 10 家庭中文版 1903
+ composer 1.8.4


# 版本仓库
---
[GitHub](https://github.com/cambridgejames/erroTips)


---
版权所有 &copy; copyright 2019 | Cambridge James
