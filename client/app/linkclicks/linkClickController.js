angular.module("sharkanalytics.linkClick", [])
.controller("linkClickController", function($scope, Links, Users) { // Controller: takes in Links object

  $scope.linkcounts = {}; // Object storing urls and their number of "hits"
  // $scope.showAll = true;
  // $scope.hideAll = false;

  // $scope.setShowAll = function(value) { // Boolean function: if the controller div is hidden and the relevant submit button is hit, we show it, and vice versa.
  //     $scope.showAll = value;
  //     $scope.hideAll = !value;
  // }

  // $scope.showDates = true;
  // $scope.hideDates = false;
  // $scope.setHideDates = function(value) { // Boolean function: same as above, but with the dates.
  //     $scope.showDates = value;
  //     $scope.showDates = !value;
  // }

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
      })
  };

  getAllClicks(); // Invoke function.

  //make request for all links at once
  // $scope.getAllLinks = function () {
  //   Links.getAllLinks() // invoke getAllLinks, from our factory
  //   .then (function (response, err) {
  //     if (err) {
  //       console.log('error', err) // error handling
  //     } else {
  //       $scope.allData = response.data; // set allData to the input data
  //       response.data.forEach(function(item) { // for each element in data...
  //         allCounts+=item.count; // increment allCounts by the amount of items in the element...
  //         $scope.clicks = allCounts; // put allCounts  under our scope, so we can access it from the HTML.
  //         $scope.getLink(item.url); // invoke getLink from our factory for the element's url.
  //       })
  //     }
  //   });
  // };

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

  //call getLink on each one of the urls in allLinks
  //in our mockup, these will be /buyify (homepage), /products, /addToCart, or /checkout
  // $scope.getLink = function(url) { // take in url...
  //   Links.getLink(url) // get the link to that url...
  //   .then(function (response, err) {
  //     if (err) { // error handling
  //       console.log('error', err)
  //     } else {
  //       $scope.linkcounts[url] = {};
  //       $scope.linkcounts[url].count = 0;
  //       $scope.linkcounts[url].count = response.data.count; // get the number of times the url was clicked
  //       $scope.linkcounts[url].url = url;
  //       $scope.linkcounts[url].dates = response.data.date; // get the current date

  //     }
  //   })

  // };

});

