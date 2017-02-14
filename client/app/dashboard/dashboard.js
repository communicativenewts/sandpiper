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
<<<<<<< HEAD
      Users.getAllSites(window.sandpiperId)
        .then(function(sites) {
          $scope.sites = sites;
          $scope.sites.forEach(function(site) {
            site.date = site.date.slice(0, -15);
          })
=======
      Auth.getUser()
        .then(function(user) {
          Users.getAllSites(user._id)
            .then(function(sites) {
              $scope.sites = sites;
              Users.setUserSite($scope.sites[0]);
            });
>>>>>>> Incorporate json web tokens to restrict access to other pages
        });
    };

    initializeSites();
<<<<<<< HEAD
=======

>>>>>>> Incorporate json web tokens to restrict access to other pages
  });