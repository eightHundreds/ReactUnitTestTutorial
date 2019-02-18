# Jest 入门

## 安装与配置
```
npm install jest --save
```
如果用babel,还需要安装
```
npm install babel-jest @babel/core @babel/preset-env --save-dev
```
配置`.babelrc`
``` JSON
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```

## 第一个例子

在index.js中创建一个sum方法
``` Js
export function sum(a,b){
    return a+b
}
```

在index.test.js中写测试代码,(jest会自动运行目录下所有*.test.js文件)
``` Js
import { sum } from './index'
describe('sum', () => {
    test('当调用参数是1和2时返回3', () => {
        expect(sum(1, 2)).toBe(3);
    })
})
```

