import React from "react";
import App from "../App";
import { shallow } from "enzyme";
test("test app render", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.result').text()).toBe("1");
  expect(wrapper.find('.subComponent').length).toBe(0);
  console.log(wrapper.debug())
});

test('should increase when click button',()=>{
  const wrapper = shallow(<App />)
  expect(wrapper.find('.result').text()).toBe("1")
  wrapper.find('button').simulate('click')
  expect(wrapper.find('.result').text()).toBe("2")
})

const getTitleContent=()=>{
  const title=document.head.querySelector('title')
  if(!title){
    return;
  }
  return title.innerText;
}

test('should init title when componentDidMount',()=>{
  const wrapper = shallow(<App />);

  expect(getTitleContent()).toBe(App.defaultProps.title);
})

test('should update title when change props',()=>{
  const wrapper = shallow(<App />);
  const newTitle='newTitle';
  wrapper.setProps({
    title:newTitle
  });
  expect(getTitleContent()).toBe(newTitle);
})