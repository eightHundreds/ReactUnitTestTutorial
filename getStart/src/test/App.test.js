import React from "react";
import App from "../App";
import { shallow } from "enzyme";
it("test app render", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.result').length).toBe(1)
  console.log(wrapper.find('subComponent').length)
  console.log(wrapper.debug())
});
