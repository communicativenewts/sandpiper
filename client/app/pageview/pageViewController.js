angular.module("sharkanalytics.pageView", [])

.controller("pageViewController", function($scope, Pages, Users) {

$scope.pageProperties = {}; // initialization block
// $scope.showAll = true;
// $scope.hideAll = false;

// $scope.setShowAll = function(boolean) { // boolean function block for interacting with HTML: showing and hiding divs.
//   $scope.showAll = boolean;
//   $scope.hideAll = !boolean;
// }

// $scope.showDates = true;
// $scope.hideDates = false;

// $scope.setHideDates = function(boolean) {
//     $scope.hideDates = boolean;
//     $scope.showDates = !boolean;
// }

var getView = function(siteId) {
  console.log('Getting View!');
  // Pages.getView(siteId).then(function(res, err) {
  //   //
  // })
};

// $scope.getPage = function(page) {
//     Pages.getPage(page).then(function (res, err) { // get our page...
//       if (err) {
//   		console.log("ERROR IN getPages METHOD OF PAGE VIEW CONTROLLER"); // error handling
//   		return;
//   	}
//   	  var ourData = res.data;
//       $scope.pageProperties[page] = {}; // local initialization block
//       $scope.pageProperties[page].count = 0;
//       $scope.pageProperties[page].title = ourData.title;
//       $scope.pageProperties[page].count = ourData.count;
//       $scope.pageProperties[page].date = ourData.date;
//   })
//   };

// var allViews = 0;

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
          getView(element._id);
        })
      }
    })
};

getAllViews();

// $scope.getAllPages = function () {
//   Pages.getAllPages().then(function (res, err) { // get all pages...
//   	if (err) {
//   		console.log("ERROR IN getAllPages METHOD OF PAGE VIEW CONTROLLER"); // error handling
//   		return;
//   	}
//   	$scope.ourPages = res.data;
//   	res.data.forEach(function (element) { // for all the elements in the data object...
//       allViews+=element.count; // update the count property
//       $scope.views = allViews;  // put allViews under our scope.
//   		$scope.getPage(element.title); // get page with the selected title
//   	})
//   })
// }

// $scope.getAllPages();

})
