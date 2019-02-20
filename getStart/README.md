# 安装

本项目基于 create-react-app 创建出的项目,所以内置了

- react
- jest

**核心**

```
yarn add enzyme enzyme-adapter-react-16 --dev
```

- 不同版本的 react 需要不同的适配器(enzyme-adapter),本项目用最新的 react(16.4)

# 正文

## 配置

测试执行前需要先配置 enzyme

```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

像这类配置应该放到同一个文件中并在测试前执行,jest 有这种配置项`setupTestFrameworkScriptFile`,修改 package.js

```
jest:{
    setupTestFrameworkScriptFile:'./test/setup.js'
}
```

但是 create-react-app 对 jest 做了一定的包装,如果像上述那样配置通过`npm run test`会报错.你应该将配置代码写到`src/setupTests.js`中

## 一个小例子

Enzyme 内置了

- shadow
  - 实现浅渲染。其作用是仅仅渲染至虚拟节点，不会返回真实的节点，能极大提高测试性能。
  - 不适合测试包含子组件、需要测试声明周期的组件
- mount
  - Full Rendering，非常适用于存在于 DOM API 存在交互组件，或者需要测试组件完整的声明周期
- render
  - Static Rendering，用于 将 React 组件渲染成静态的 HTML 并分析生成的 HTML 结构。并使用[cheerio](https://cheerio.js.org/)解析html

第一个测试就简单地测试组件是否按预期渲染
被测试的组件

```JavaScript
import React, { Component } from "react";
class SubComponent extends Component {
  render() {
    return <div className="subComponent">SubComponent</div>;
  }
}
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <div className="result">
            1
        </div>
        <SubComponent />
      </div>
    );
  }
}

export default App;
```

测试代码
``` Javascript
import React from "react";
import App from "../App";
import { shallow } from "enzyme";
it("test app render", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.result').length).toBe(1)
  expect(wrapper.find('subComponent').length).toBe(0)
  console.log(wrapper.debug())
  /* 输出:
    <div className="App">
      <div className="result">
        1
      </div>
      <SubComponent />
    </div>
  */
});
```
shallow将组件渲染,将结果包装,并提供一系列方法.

- `expect(wrapper.find('.result').length).toBe(1)`断言组件内能找到类名是`result`的节点
- 由于使用的是`shallow`,`SubComponent`的内容并不能测到,所以这句能通过测试`expect(wrapper.find('subComponent').length).toBe(0)`
- 你可以使用wrapper.debug()输出类似html的字符串来看看渲染结果

# 总结

本文很短,没有大量的官方文档翻译:) ,我认为像这类工具库没必要把文档都读完(你用jquery前会把文档读完?).而且Enzyme的api也比较简单,大部分都是dom查询操作,所以这部分还是留给你自己查了(我在根目录README提供了中文api地址) 





# tips

- 不同react版本enzyme的安装方式都不同,请仔细参阅[官方文档](http://airbnb.io/enzyme/docs/installation/)