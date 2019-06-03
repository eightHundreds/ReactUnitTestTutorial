import React, { Component } from "react";
import { shallow, mount, render } from "enzyme";
import Square from "./Square";

describe("Square", () => {
	test("test render", () => {
		const mockOnClick = jest.fn();
		const wrapper = shallow(<Square value={123} onClick={mockOnClick} />);
		expect(wrapper.text()).toBe("123");
		wrapper.simulate("click");
		expect(mockOnClick).toBeCalled();
	});
});
