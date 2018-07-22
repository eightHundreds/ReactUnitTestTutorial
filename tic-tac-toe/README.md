# 安装

本项目基于 create-react-app

```
yarn add enzyme enzyme-adapter-react-16 --dev
```

本项目是 react 官方文档教程的教学代码,写的是一个井字棋
你可以使用`npm run start`启动来玩一下

# 测试用例

先启动项目看看效果,如果你懒的话可以通过[这个](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)预览

我们先不看代码,以黑盒测试的角度测这个组件,首先列出主要测试用例,这些用例是我们的最终目标

1.  第一个棋子是 X,棋子是`X`,`O`轮流变化的,用户点击棋盘某个地方,如果这个地方没有棋子就下一个棋子
2.  如果有 X 棋子垂直,水平或斜方向凑成 3 个则该类棋子胜利,页面应展示胜利`Winner: X`

右边的 Go to 按钮组就先不测了

# 编写测试代码

首先看下页面结构

```HTML
<div class="game-board">
    <div>
        <div class="board-row">
            <button class="square"></button>
            <button class="square"></button>
            <button class="square"></button>
        </div>
        <div class="board-row">
            <button class="square"></button>
            <button class="square"></button>
            <button class="square"></button>
        </div>
        <div class="board-row">
            <button class="square"></button>
            <button class="square"></button>
            <button class="square"></button>
        </div>
    </div>
</div>
```

这是个 3X3 的棋盘,`<button class="square"></button>`是落子的地方

而实际代码中,这块 HTML 是由 3 种组件渲染生成的,分别是 Game,Board,Square,Game 组件依赖 Board,Board 依赖 Square.这里我打算采用自底向上的单元测试策略,测试顺序是 Square->Board->Game

首先测试 Square

```JavaScript
// 源码
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// 测试代码
describe("test Square", () => {
  it("test render", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Square value={123} onClick={mockOnClick} />);
    expect(wrapper.text()).toBe("123");
    wrapper.simulate("click");
    expect(mockOnClick).toBeCalled();
  });
});
```

根据 Square 的 props 可知,该组件应能正确地渲染 `props.value`,并且被点击时能调用`props.onClick`
测试中传入 Square 的 onClick 方法,你可以自己手动写一个,但推荐使用 mock 工具生成,在以后的测试工作中你会经常用到 mock,这里 onClick 使用了`jest.fn`生成的 mock 方法.

接着测试 Board,到这里已经有个前提条件,即 Square 是可靠的,因为我们刚刚测过了

Board 源码:

```JavaScript
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

用一句话描述 Board 的作用就是绘制一个 3X3 棋盘并赋予每个格子点击事件
由于之前测过了 Square,那么这里渲染结果就不测了

测试代码:
```JavaScript
describe("test Board", () => {
  it("test render", () => {
    //给与一个默认实现,这个实现是一个返回值总是'mock function'的函数
    const mockOnClick = jest.fn(() => "mock function");
    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const wrapper = shallow(<Board squares={squares} onClick={mockOnClick} />);
    expect(
      wrapper.findWhere(
        wrapper =>
          wrapper.is(Square) && wrapper.prop("onClick")() === "mock function"
      ).length
    ).toBe(9);
  });
});
```

最后测试的就是 Game,也就是我们的最终要测的那些用例,由于会与子组件交互,这里使用`mount`替代`shallow`

```Javascript
describe("case 2", () => {
  const click = (x, y, rows, exceptContent) => {
    const button = rows
      .at(y)
      .find(".square")
      .at(x);
    button.simulate("click");
    if (exceptContent) {
      expect(button.text()).toBe(exceptContent);
    }
  };
  it("X win", () => {
    const wrapper = mount(<Game />);
    const rows = wrapper.find(".board-row");
    click(0, 0, rows, "X");
    click(1, 1, rows, "O");
    click(0, 1, rows, "X");
    click(2, 2, rows, "O");
    click(0, 2, rows, "X");
    const result = wrapper
      .find(".game-info > div")
      .first()
      .text();
    expect(result).toBe("Winner: X");
  });
});
```
到此,Game主要逻辑就差不多测完了,那么如何判断自己的测试好不好?最简单又最常用的数据就是测试覆盖率.

在create-react-app创建的项目中,只要执行`npm run test -- --coverage`(一般项目用`jest --coverage`),就能生成测试覆盖报告

File                      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------------------|----------|----------|----------|----------|-------------------|
All files                 |    33.71 |    34.78 |    33.33 |    50.85 |                   |
 App.js                   |        0 |        0 |        0 |        0 |          1,2,6,11 |
 Board.js                 |      100 |      100 |      100 |      100 |                   |
 Game.js                  |    89.29 |    94.12 |       75 |    89.29 |          43,58,73 |
 index.js                 |        0 |        0 |        0 |        0 |     1,2,3,4,5,6,7 |
 registerServiceWorker.js |        0 |        0 |        0 |        0 |... 36,137,138,139 |
 setupTests.js            |      100 |      100 |      100 |      100 |                   |

可以看到,Square与Board组件所在的Board.js文件都测完了,Game也测了差不多(Go to 按钮组没测)

> 这些数据的意思请参考[这里](http://www.ruanyifeng.com/blog/2015/06/istanbul.html)




# 总结

前文使用的是自底向上的单元测试策略,这不是一种存粹的单元测试,比如在测试Game组件时就依赖的其他模块.纯粹的单元测试是`孤立单元测试`即为每个单元编写桩模块和驱动模块.

以前写后端的单元测试的时候我只需要关注函数的参数和返回值,而前端可以测的东西还挺多的,你的输入不仅是那括号间用逗号隔开的变量,还有各种事件(事件可能来自用户,计时器,请求回调等),有时候还要关心全局变量(window).输出也变得复杂,基本上都是嵌套的 Viral Dom 对象,除了 Dom 结构你甚至可能要关注它在浏览器中的真实呈现.  
不得不说,前端的测试成本是很高的,首先它不是简单的数据,是复杂的呈现,可以测的东西很多.其次实际开发中界面的变化大,这点我不用解释大家都知道.

总之单元测试是有效的,有成本的,相比后端前端测试成本更大.但别气馁,软件开发也是有二八定律的,(80%的缺陷/80%的价值)来自20%的程序.所以我们因结合自身的经验和项目特点,选择合适测试方法和工具,写出最具性价比的测试代码.而这也是我正在研究的问题.


# 参考

## 什么场景适合端到端(e2e)测试?

> 和单元测试／集成测试相比，E2E 测试可以用更少的代码覆盖更多的测试场景，代价则是测试的细致程度不足。  
> **需要注意的是：不是所有项目都适合写 E2E 测试**，以下几点可以帮助你判断自己的项目适不适用 E2E 测试。  
> 项目周期长。编写 E2E 测试会消耗不少时间和精力，如果不是长期维护的项目没必要进行这些投入。  
> 项目迭代频率高。如果迭代间隔非常长，有充足的测试时间和人手，那么细致的手动界面测试会更加可靠。  
> 页面结构稳定。E2E 测试一般依靠 css/xpath 选择器作为定位元素的方法，如果页面的 dom 解构经常变更，那么维护测试用例的成本会上升。
>
> 此外在以下场景中 E2E 测试的效果比较好：  
> 纯静态页面，最好是连内容都不变的页面。可以通过在浏览器层面做截图，然后比较前后两个迭代版本截图的是否一致来判断变更是否破坏了页面的最终展示或者展示的改变是否和预期一致  
> 兼容性测试。如果需要测试项目在各种浏览器下的兼容性问题，可以通过 E2E 测试一次覆盖多个不同浏览器。  
> 交互复杂、交互步骤多。例如一个复杂的多步表单的填写，人工操作成本越大，用 E2E 自动完成带来的收益就越多。  
> **但是要留心，和其他测试一样，如果你的测试流程有数据写入，那么在测试结束后应该清除写入的数据，保证再次运行时又是一个一致的环境。**  
> 来源:https://segmentfault.com/q/1010000009239697

# 名词解释

- 桩模块与驱动模块
  - **桩模块**用来代替被测基本单元调用的其他单元
  - **驱动模块**被测基本单元的主程序,它接受测试数据,并把数据传送给被测单元,最后输出实测结果
  - 用文中的例子就是Board是Game的桩模块,Game是Board驱动模块  
  - 我们常常使用mock工具创建桩模块或驱动模块
- 集成测试
  - 假定各个软件单元已经通过了单元测试的前提下检查各个软件单元之间的互相接口是否正确
  - 参考:http://bbs.51testing.com/thread-72833-1-1.html
