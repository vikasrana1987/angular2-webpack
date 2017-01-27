describe('Users', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-users>', function () {
    var users = element(by.css('my-app my-users'));
    expect(users.isPresent()).toEqual(true);
    expect(users.getText()).toEqual("Users Works!");
  });

});
