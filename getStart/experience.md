

本文记录是在真实项目中引入测试时遇到的问题



# webpack

问题

- 但有静态资源(js中import的css)时测试时会出错
- 项目中使用了webpack的alias

关于这些问题,[官方](https://jestjs.io/docs/zh-Hans/webpack)已经给出较详细的配置





# 环境

jest的默认环境是jsdom,是浏览器环境,意思是会为测试环境注入个window

- 通过`jest --env=node`可以修改环境,还有种就是配置中的`testEnvironment`
- 在使用22版jest时可能会遇到`[ localStorage is not available for opaque origins](https://stackoverflow.com/questions/51554366/jest-securityerror-localstorage-is-not-available-for-opaque-origins)`问题,相关[讨论](https://github.com/facebook/jest/issues/6766)
  1. 设置`testURL: 'http://localhost' `
  2. 或者`--env=node`





# 待整理

- 组件名必须开头大小,否则会被认为普通的标签

