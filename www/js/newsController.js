  angular.module('newsApp')
    .controller('newsController', newsController);

  function newsController($scope, $http, $window) {
    this.news = [];

    function onHTTPSuccess(response) {
      angular.forEach(response.data.articles, function (item) {
        this.news.push(item);
      });
      this.$broadcast('scroll.infiniteScrollComplete');

    }

    this.open = function (url) {
      $window.location = url;
    }

    this.doRefresh = function () {
      this.news = [];
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
  }
