angular.module('app.onboarding', [])
  .controller('onboardingController', function($scope) {

    $scope.newSite;
    $scope.validURL = '';

    $scope.checkURL = function() {
      console.log('checking Url');
      var regEx = /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.([-a-zA-Z0-9@:%._\+~#=]{2,256}\.)*[a-z]{2,6}$/;
      if (regEx.test($scope.newSite)) {
        console.log('valid site');
        $scope.validURL = 'Valid Site';
        $('#site-input').addClass("has-success");
      } else {
        console.log('invalid site');
        $scope.validURL = 'Invalid Site';
        $('#site-input').addClass("has-error");
      }
    };

    $scope.script = 'Please complete Step 1 to access your custom script.';

    $scope.createScript = function() {
      //submit website url to server
      //receive id back from server
      $scope.script = '<script>window.sandpiperid = \"' + providedId + '\"</script>\n<script src = "scriptsource.com"></script>';
    };
  });