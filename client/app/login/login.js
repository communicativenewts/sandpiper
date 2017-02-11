angular.module('app.login', [])
  .controller('loginController', function($scope, Users) {

    $scope.loginUser = function () {
      Users.loginUser({
        username: $scope.username,
        password: $scope.password
      });
    };


  });