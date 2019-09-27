# erroTips - 站点目录管理工具
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cambridgejames/erroTips?color=red)
![GitHub repo size](https://img.shields.io/github/repo-size/cambridgejames/erroTips?color=yellow)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/cambridgejames/erroTips)
![GitHub](https://img.shields.io/github/license/cambridgejames/erroTips)
![GitHub followers](https://img.shields.io/github/followers/cambridgejames?label=Follow&style=social)

---

**简介：** 本项目可以用于管理多个虚拟网站，提供网站的入口；同时可用于自定义错误代码（如404、500等）的显示。

**适用范围：** 包括但不限于拥有多个虚拟站点且只有一个服务器的个人站长用户。

**部署地址：** [http://www.compscosys.cn](http://www.compscosys.cn)

**注：** 本代码库中的错误代码显示页面来自[https://404.life](https://404.life)

---

# 功能介绍

### 1. 概述
站点目录管理工具是一个为其他站点提供跳转链接入口和错误代码页面的独立的站点，其前端使用HTML5、CSS3和jQuery配合Bootstrap编写，后端使用通过PHP7.2.7实现的一个简单的框架配合Twig模板引擎实现请求的转发和模板的渲染。

有关于本项目更详细的使用方法请参照下方的“使用说明”。

### 1. 站点目录显示模块
通过将本项目部署在指定域名的默认虚拟站点下，并将其他项目的地址、标题、图标等信息填入指定的配置文件，可以在本项目的首页显示指定站点的入口和基本信息。

此外，站点目录中能够显示的站点包括但不限于与本站点部署在同一域名下的其它虚拟站点。用户也可以将其他（如：CSDN主页、GitHub主页等）站点用同样的方法放置在站点目录中。

### 2. 站内模糊搜索模块
本项目使用jQuery实现了一个完全基于前端的简单且可扩展的站内模糊搜索模块。该模块通过在页面框架加载结束时扫描并解析站点目录列表来获取全部的站点信息，在用户键入关键词并点击搜索时使用用户自定义的方式计算每个站点的权重，并对站点进行排序、关键词高亮等操作，最后显示在前端页面上。

由于上述算法完全基于DOM操作，因此本项目中的站内模糊搜索模块不需要使用Ajax技术便可以实现搜索功能。

此外，本模块也支持用户自定义算法和功能。如：通过在关键词分割方法中接入自然语言处理API可以实现不需要空格分隔关键词的模糊查找功能。具体的自定义方法请参考下方的“使用说明-站内搜索模块”。

### 3. 错误代码显示模块
本项目提供一个错误代码显示模块。通过在服务器中将对应错误代码的页面指向本项目中的对应页面，可以实现对所有虚拟站点的错误代码显示模块的统一处理。

与前述两个模块类似，错误代码显示模块中的页面也支持用户自定义。具体的自定义方法请参考下方的“使用说明-错误代码显示模块”。


# 使用说明

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
+ 修改"/core/config"目录下的website.php中的“list”项
+ 其中：每一项的key代表了站点的目标网址，method为站点的协议，icon为站点的图标，title为站点名称，view为站点简介
+ 需要注意的是，该文件使用PHP中的array语法定义错误代码和对应描述之间的关系。

##### 2. 自定义站点标签样式
+ 通过修改模板"/static/views/websites.twig"和样式表"/static/css/website-main.css"，用户可以自行修改站点标签的样式。但同时要进行下列操作确保站内搜索功能正常运行：
+ 修改"/static/js"目录下web-searching.js中的ListSearchControler类中的普通函数
+ 解析类：
    * nodeAnalysiser(itemNode)
        - 功能：定义如何获取指定itemNode中的信息
        - 输入参数：itemNode - 单个站点标签的jQuery对象
        - 输出参数：指定站点标签中所包含的信息
    * nodeRender(newNode, curInfo)
        - 功能：定义如何将指定的信息渲染到指定的站点标签中
        - 输入参数：newNode - 新的空站点标签的jQuery对象；curInfo - 要向对象中放置的信息
+ 样式类：
    * keyWordsHighLighter(curString, keyWords)
        - 功能：定义如何高亮显示指定字符串中的关键词。
        - 输入参数：curString - 原始字符串；keyWords - 关键词数组
        - 输出参数：使用span元素标记后的高亮显示的字符串
+ 注意：新的空站点标签的结构来自"/static/views/websites.twig"中的"#template"，因此若要进行上述自定义操作，需要修改其中的结构以适应新的规则


### 3. 站内搜索模块
##### 1. 自定义关键词分割算法
+ 修改"/static/js"目录下web-searching.js中的startSearch()方法

##### 2. 自定义站内搜索权重计算方式
+ 修改"/static/js"目录下web-searching.js中的ListSearchControler类中的普通函数
+ 其中：
    * weightCalculator(curInfo, keyWords)
        - 功能：定义如何根据单条数据和全部关键词计算数据所占的权重值
        - 输入参数：curInfo - 单个站点标签中包含的信息；keyWords - 关键词数组
        - 输出参数：输入站点标签对输入关键词的权重值

##### 3. 开启或关闭关键词高亮
+ 通过修改"/static/js"目录下web-searching.js中ListSearchControler.rendSearchList(isHighLight = true)方法中参数的默认值，或向"/static/js/web-searching.js:45"中的rendSearchList方法传入自定义的参数可以开启或关闭关键词高亮
+ 当传入true时，关键词高亮开启；当传入false时，关键词高亮关闭；当不传入任何参数时，关键词的开启或关闭由默认参数值控制


### 3. 错误代码显示模块
##### 1. 自定义错误提示页面
+ 修改"/static/views"目录下的errors.twig
+ 其中：错误代码使用"{{ code }}"代替，错误描述用"{{ text }}"代替。
+ 注意：页面模板文件必须遵循twig语法规范。

##### 2. 自定义错误提示代码和描述
+ 修改"/core/config"目录下的error.php
+ 需要注意的是，该文件使用PHP中的array语法定义错误代码和对应描述之间的关系。


# 版本更新

### V1.03.0927
1. 新增站内搜索模块
2. 站点目录新增GitHubPages、CSDN博客和简书
3. 优化了站点目录显示模块的前端样式

### V1.02.0924
1. 新增站点目录显示模块
2. 修复了更改错误代码显示模块的页面模板文件后模块加载异常的问题

### V1.01.0923
1. 将错误代码显示模块的页面模板文件更改为twig文件

### V1.01.0922
1. 新增错误代码显示模块
2. 将项目中所有未捕获并处理的异常重定向至错误代码显示模块


# 开发文档

### 1. 开发环境
+ PHP 7.2.7
+ Windows 10 Version 1903
+ composer 1.8.4


# 版本仓库

[GitHub: https://github.com/cambridgejames/erroTips](https://github.com/cambridgejames/erroTips)

本项目遵循MIT开源许可协议，详情请见LICENSE文件
