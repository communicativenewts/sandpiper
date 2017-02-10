angular.module('app.dashboard', [])
  .controller('dashboardController', function($scope) {

    $scope.sites = [
      {
        id: 1,
        url: 'www.amazon.com',
        title: 'My Amazon Marketplace',
        status: 'active',
        date: 'January 4, 2017'
      },
      {
        id: 2,
        url: 'www.blog.com',
        title: 'My Blog',
        status: 'suspended',
        date: 'May 23, 2016'
      },
      {
        id: 3,
        url: 'www.business.com',
        title: 'My Business\'s Website',
        status: 'active',
        date: 'September 6, 2016'
      }
    ];

    $scope.selected = 'none';

    $scope.stats = function(site) {
      //save selected site to factory
      $scope.selected = site.id;
      $location.path('/stats');
    };
  });