angular.module('app.dashboard', [])
  .controller('dashboardController', function($scope, Users) {
    $scope.user = Users.getUserId();

    $scope.sites = [];

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

    var initializeSites = function() {
      Users.getAllSites(Users.getUserId())
        .then(function(sites) {
          $scope.sites = sites;
        });
    };

    initializeSites();

  });
