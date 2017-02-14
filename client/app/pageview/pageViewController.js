angular.module("sharkanalytics.pageView", [])
.controller("pageViewController", function($scope, Pages, Users) {

  $scope.pageProperties = {}; // initialization block

  var getView = function(pageView) {
    Pages.getView(pageView._id).then(function(res, err) {
      if (err) {
        console.log('Error: getView in pageViewController.', err);
      } else {
        var ourData = res;
        $scope.pageProperties[pageView.title] = {}; // local initialization block
        $scope.pageProperties[pageView.title].count = 0;
        $scope.pageProperties[pageView.title].title = ourData.title;
        $scope.pageProperties[pageView.title].count = ourData.count;
        $scope.pageProperties[pageView.title].date = ourData.date;
      }
    });
  };

  $scope.views = 0;

  var getAllViews = function() {
    Pages.getSiteViews(Users.getUserSite())
      .then(function(res, err) {
        if (err) {
          console.log('Error: getAllViews in pageViewController.', err);
        } else {
          $scope.ourPages = res;
          res.forEach(function(element) {
            $scope.views += element.count;
            getView(element);
          });
        }
      });
  };

  getAllViews();

});