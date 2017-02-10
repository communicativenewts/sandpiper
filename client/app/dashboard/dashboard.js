angular.module('app.dashboard', [])
  .controller('dashboardController', function($scope) {
    $scope.value = '(website list here)';
    $scope.sites = [
      {
        id: 1,
        url: 'www.amazon.com',
        title: 'My Amazon Marketplace'
      },
      {
        id: 2,
        url: 'www.blog.com',
        title: 'My Blog'
      },
      {
        id: 3,
        url: 'www.business.com',
        title: 'My Business\'s Website'
      }
    ];
  });