var app = angular.module('newsApp', ['ionic']);

app.controller('newsController', function ($scope, $http) {
  $scope.news = [];


  function onHTTPSuccess(response) {
    angular.forEach(response.data.articles, function (item) {
      $scope.news.push(item);
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }


  $scope.loadMore = function () {
    var parameters = {
      id: $scope.lastarticleID
    };
    $http.get('https://newsapi.org/v1/articles?source=techcrunch&apiKey=04f5335df8e94d318199e653a6595ba1', {params: parameters}).success(onHTTPSuccess);
  };


  $scope.doRefresh = function () {
    $scope.news = [];
    $http({
      method: "GET",
      url: "https://newsapi.org/v1/articles?source=techcrunch&apiKey=04f5335df8e94d318199e653a6595ba1"
    })
      .then(onHTTPSuccess)
  };

  $http({
    method: "GET",
    url: "https://newsapi.org/v1/articles?source=techcrunch&apiKey=04f5335df8e94d318199e653a6595ba1"
  })
    .then(onHTTPSuccess)

})


  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
