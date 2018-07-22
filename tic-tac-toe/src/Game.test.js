import React, { Component } from "react";
import { mount } from "enzyme";
import Game from "./Game";
it("123", () => {});
it("case 1", () => {
  const wrapper = mount(<Game />);

  const firstBoardRow = wrapper.find(".board-row").first();
  const firstButton = firstBoardRow.find(".square").first();
  const secondButton = firstBoardRow.find(".square").at(1);
  firstButton.simulate("click");
  secondButton.simulate("click");
  expect(firstButton.text()).toBe("X");
  expect(secondButton.text()).toBe("O");
});

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
