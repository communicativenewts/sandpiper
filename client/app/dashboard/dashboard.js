angular.module('app.dashboard', [])
  .controller('dashboardController', function($scope, $location, Users) {
    $scope.sites = [];

    $scope.selected = 'none';

    $scope.stats = function(site) {
      $scope.selected = site.id;
      Users.setUserSite(site);
      $location.path('/overallStats');
    };

    angular.element(document).ready(function () {
        $('#dashboard-table').DataTable({
            responsive: true
        });
    });

    var initializeSites = function() {
      Users.getAllSites(Users.getUserId())
        .then(function(sites) {
          $scope.sites = sites;
          $scope.sites.forEach(function(site) {
            site.date = site.date.slice(0, -15);
          })
        });
    };

    initializeSites();
  });
