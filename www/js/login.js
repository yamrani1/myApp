(function () {

  angular
    .module('newsApp')
    .controller('loginCtrl', loginCtrl)


  function loginCtrl($http, LoginService) {
    var vm = this;
    vm.formSubmit = formSubmit;


    function init() {
      // console.log(login('admin', 'pass'));
    }

    function formSubmit(login, password) {
      LoginService.login(login, password).then(function (data) {
        console.log(data);

      })

    }

    init();
  }
})();
