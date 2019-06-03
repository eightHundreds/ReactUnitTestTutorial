import React from "react";
import Board from "./Board";
import Square from './Square'
import { shallow, mount, render } from "enzyme";



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
