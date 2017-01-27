describe('Register', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-register>', function () {
    var register = element(by.css('my-app my-register'));
    expect(register.isPresent()).toEqual(true);
    expect(register.getText()).toEqual("Register");
  });

});
