angular.module('app.onboarding', [])
  .controller('onboardingController', function($scope, Users) {

    $scope.userId = Users.getUserId();
    $scope.newSite = {
      url: null,
      title: ''
    };

    $scope.validURL = '';
    $scope.validTitle = '';
    $scope.siteId = null;

    $scope.checkURL = function() {
      console.log('checking Url');
      var regEx = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.([-a-zA-Z0-9@:%._\+~#=]{2,256}\.)*[a-z]{2,6}$/;
      if (regEx.test($scope.newSite)) {
        console.log('valid site');
        $scope.validURL = 'Valid Site';
        $('#site-input').removeClass('has-error');
        $('#site-input').addClass('has-success');
      } else {
        console.log('invalid site');
        $scope.validURL = 'Invalid Site';
        $('#site-input').removeClass('has-success');
        $('#site-input').addClass('has-error');
      }
    };

    $scope.script = 'Please complete Step 1 to access your custom script.';

    $scope.createScript = function() {
      if ($scope.newSite.title.length === 0) {
        $scope.validTitle = 'Please give this website a title';
        return;
      }
      Users.addNewSite($scope.userId, $scope.newSite)
      .then(function(siteId) {
        $scope.siteId = siteId;
        $scope.script = '<script>window.sandpiperid = \"' + siteId + '\"</script>\n<script src = "scriptsource.com"></script>';
      });
    };

    $scope.startTracking = function() {
      Users.setUserSite($scope.siteId);
      $location.path('/dashboard');
    }

  });