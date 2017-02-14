angular.module("sharkanalytics.linkClick", [])
.controller("linkClickController", function($scope, Links, Users) { // Controller: takes in Links object

  $scope.linkcounts = {}; // Object storing urls and their number of "hits"

  $scope.clicks = 0; // the total amount of counts

  var getAllClicks = function() {
    Links.getSiteClicks(Users.getUserSite())
      .then(function(response, err) {
        if (err) {
          console.log('Error: getAllClicks in linkClickController.', err);
        } else {
          $scope.allData = response;
          response.forEach(function(item) {
            $scope.clicks += item.count;
            getClick(item);
          })
        }
      });
  };

  getAllClicks(); // Invoke function.

  var getClick = function(linkClick) {
    Links.getClick(linkClick._id)
      .then(function(response, err) {
        if (err) {
          console.log('Error: getClick in linkClickController.', err);
        } else {
          $scope.linkcounts[linkClick.url] = {};
          $scope.linkcounts[linkClick.url].count = 0;
          $scope.linkcounts[linkClick.url].count = response.count; // get the number of times the url was clicked
          $scope.linkcounts[linkClick.url].url = linkClick.url;
          $scope.linkcounts[linkClick.url].dates = response.date; // get the current date
        }
      });
  };

});

