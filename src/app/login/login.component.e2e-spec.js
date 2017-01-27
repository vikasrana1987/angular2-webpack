describe('Login', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-login>', function () {
    var login = element(by.css('my-app my-login'));
    expect(login.isPresent()).toEqual(true);
    expect(login.getText()).toEqual("Login Works!");
  });

});
