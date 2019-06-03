Feature: 下棋
  Scenario: 游戏开始,下第一颗棋子
    Given 棋盘空白,Next player 是 O
     When 点击空白处
     Then 空白处变成O
  
  Scenario: X获胜,游戏结束
    Given 
      当棋盘:
        X X _
        _ o _
        _ _ o
      轮到X落子
     When X在(0,2)处落子
     Then X获胜


Feature: 历史
  Scenario: 查看历史
    Given X已经获得胜利
     When 点击Go to move #3
     Then 展示第三步时棋盘的情况


