angular.module('app.dashboard', [])
  .controller('dashboardController', function($scope, Users) {

    $scope.user = Users.getUserId();

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
      $scope.selected = site.id;
      Users.setUserSite = site;
      $location.path('/stats');
    };

    $scope.populateSites = function() {
          console.log($scope.user);
    }

    $scope.populateSites();

    angular.element(document).ready(function () {
        $('#dashboard-table').DataTable({
            responsive: true
        });
    });

  });
