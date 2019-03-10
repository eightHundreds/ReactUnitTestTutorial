import "./index";
test("render", done => {
  window.addEventListener("load", function() {
    expect(document.body.innerHTML).toBe("Hello world");
    done();
  });
});
