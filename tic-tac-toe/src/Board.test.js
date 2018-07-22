import Board, { Square } from "./Board";
import { shallow, mount, render } from "enzyme";

import React from "react";
describe("test Square", () => {
  it("test render", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Square value={123} onClick={mockOnClick} />);
    expect(wrapper.text()).toBe("123");
    wrapper.simulate("click");
    expect(mockOnClick).toBeCalled();
  });
});

describe("test Board", () => {
  it("test render", () => {
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
