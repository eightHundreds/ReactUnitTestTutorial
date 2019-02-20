import Board, { Square } from "./Board";
import { shallow, mount, render } from "enzyme";

import React from "react";
describe("Square", () => {
  test("test render", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Square value={123} onClick={mockOnClick} />);
    expect(wrapper.text()).toBe("123");
    wrapper.simulate("click");
    expect(mockOnClick).toBeCalled();
  });
});

describe("Board", () => {
  test("test render", () => {
    const mockOnClick = jest.fn(() => "mock function");
    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const wrapper = shallow(<Board squares={squares} onClick={mockOnClick} />);
    expect(
      wrapper.findWhere(
        wrapper =>
          wrapper.is(Square)
      ).length
    ).toBe(9);
  });
});
