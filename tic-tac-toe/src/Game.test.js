import React, { Component } from "react";
import { mount } from "enzyme";
import Game from "./Game";

let GameWrapper;
beforeEach(() => {
  GameWrapper = mount(<Game />);
});

const click = (x, y, wrapper) => {
  if (!wrapper) {
    wrapper = GameWrapper;
  }
  const rows = wrapper.find(".board-row");
  const button = rows
    .at(y)
    .find(".square")
    .at(x);
  button.simulate("click");
};

const applySteps = (steps, wrapper) => {
  steps.forEach(item => {
    click(item[0], item[1], wrapper);
  });
};

test("should render X when first btn click render O when second btn click", () => {
  const firstBoardRow = GameWrapper.find(".board-row").first();
  const firstButton = firstBoardRow.find(".square").first();
  const secondButton = firstBoardRow.find(".square").at(1);
  firstButton.simulate("click");
  secondButton.simulate("click");
  expect(firstButton.text()).toBe("X");
  expect(secondButton.text()).toBe("O");
});

test("should show Next player:O  after first click", () => {
  click(0,0);

  const nextPlayer = GameWrapper.find(".game-info > div");
  expect(nextPlayer.text()).toBe("Next player: O");
});

test.each`
  clickSteps                                          | winner
  ${[[0, 0], [1, 1], [0, 1], [2, 2], [0, 2]]}         | ${"X"}
  ${[[0, 0], [1, 1], [0, 1], [1, 2], [2, 2], [1, 0]]} | ${"O"}
`("test winner ,$winner win", ({ clickSteps, winner }) => {
  applySteps(clickSteps);
  const result = GameWrapper.find(".game-info > div")
    .first()
    .text();
  expect(result).toBe(`Winner: ${winner}`);
});

describe("history", () => {
  const steps = [[0, 0], [1, 1], [0, 1], [2, 2], [0, 2]];
  beforeEach(() => {
    applySteps(steps);
  });
  test("should correct render history", () => {
    const no = 3;
    const btn = GameWrapper.find(".game-info ol li")
      .at(no)
      .find("button");
    expect(btn.text()).toBe(`Go to move #${no}`);
  });
  test(`should correct render when click history`, () => {
    const gotoStepNo = 3;
    const btn = GameWrapper.find(".game-info ol li")
      .at(gotoStepNo)
      .find("button");

    const anotherGame = mount(<Game />);
    applySteps(steps.slice(0, gotoStepNo), anotherGame);
    const expectBoard = anotherGame.find(".game-board").html();

    btn.simulate("click");
    expect(GameWrapper.find(".game-board").html()).toBe(expectBoard);
  });
});

