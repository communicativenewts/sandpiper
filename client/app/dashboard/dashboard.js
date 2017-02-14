angular.module('app.dashboard', [])
  .controller('dashboardController', function($scope, $location, Auth, Users) {
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
      Auth.getUser()
        .then(function(user) {
          Users.getAllSites(user._id)
            .then(function(sites) {
              $scope.sites = sites;
              Users.setUserSite($scope.sites[0]);
            });
        });
    };

    initializeSites();

  });