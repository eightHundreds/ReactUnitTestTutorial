import React from "react";
import App from "../SimpleApp";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
// SimpleApp.test.js
it("test app render", () => {
  const wrapper = shallow(<App value={1} />);
  expect(wrapper.find(".result").text()).toBe("1");
  expect(wrapper.find(".subComponent").length).toBe(0);

  console.log(wrapper.debug());
});

test("snapshots", () => {
  const wrapper = shallow(<App value={1} />);
  expect(wrapper).toMatchSnapshot();
});
