angular.module('app.login', [])
  .controller('loginController', function($scope, Users) {
    $scope.userData = {};

    $scope.loginUser = function () {
      Users.findUser($scope.username)
        .then(function(user) {
          $scope.userData = user;
        })
        .catch(function(error) {
          console.error(error);
        });
    };


  });