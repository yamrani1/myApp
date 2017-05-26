(function () {


  angular.module('newsApp')
    .controller('ctrlId', ctrlId);

  function ctrlId($http, $window, $q, LoginService) {

    var vm = this;
    vm.data = [];
    vm.data2 = [];

    vm.magic2 = magic2;
    vm.traitement = traitement;
    vm.magic = magic;


    function init() {
      magic();

    }

    function traitement(id) {

      angular.forEach(vm.data.instances, function (element) {

        if (element.id == id) {
          vm.url = element.url;
          magic2();
          LoginService.setInstanceURL(url);
          vm.checked = true;
        }
      })
    }

    vm.onClick = function (id) {

      $window.open(traitement(id))

    }


    function magic2() {

      var deferred = $q.defer();

      $http({
        method: "GET",
        url: vm.url + "/rest/v2/;instance_info"
      })
        .then(function (request) {

          vm.data2 = request.data2;

          vm.urlLogo = "data:image/png;base64," + request.data.logo;

          deferred.resolve(request)

        }).catch(function (err) {
        console.log(err)
        deferred.reject(err)
      })
      return deferred.promise;
    }


    function magic() {

      var deferred = $q.defer();

      $http({
        method: "GET",
        url: "https://apps.bepatientsolutions.com/instances.json"

      }).then(function (request) {

        vm.data = request.data;
        deferred.resolve(request)
      }).catch(function (err) {
        console.log(err)
        deferred.reject(err)
      })

      return deferred.promise;
    }

    init();

  }

})();
