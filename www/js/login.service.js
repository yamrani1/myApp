(function () {
  'use strict';

  angular
    .module('newsApp')
    .factory('LoginService', LoginService);


  function LoginService($http) {
    var _instanceURL;

    return {
      setInstanceURL: setInstanceURL,
      getInstanceURL: getInstanceURL,
      login : login
    };

    ////////

    function login(login, password) {
      return $http({
          method: "POST",
          url: getInstanceURL() + "/rest/v2/;login"

          , data: {
            login: login,
            password: password,
            fingerprint: "webApp"
          }
        }
      )
    }

    function setInstanceURL(instanceURL) {
      _instanceURL = instanceURL;
    }

    function getInstanceURL() {
      return _instanceURL;
    }
  }

})();
