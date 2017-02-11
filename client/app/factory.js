angular.module('sharkanalytics.factory', [])

/* LINKS FACTORY */
.factory('Links', function ($http) {

  //should get all links from database
  var getAllLinks = function () {
    return $http({
      method: 'GET',
      url: '/linkClickAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getLink = function (url) {
    return $http({
      method: 'GET',
      url: '/linkClick',
      params: {url: url}
    })
    .then(function (response) {
      return response;
    });
  };

  return {
    getAllLinks: getAllLinks,
    getLink: getLink
  };
})


/* PAGES FACTORY */
.factory('Pages', function ($http) {

  //should get all links from database
  var getAllPages = function () {
    return $http({
      method: 'GET',
      url: '/pageViewAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getPage = function (title) {
    return $http({
      method: 'GET',
      url: '/pageView',
      params: {title: title}
    })
    .then(function (response) {
      return response;
    });
  };

  return {
    getAllPages: getAllPages,
    getPage: getPage
  };
})

.factory('Users', function ($http){

  var findUser = function(username) {
    return $http({
      method: 'GET',
      url: '/api/users:' + username
    }).then(function(response) {
      return response.data;
    });
  };

  var createUser = function (data) {
    return $http({
      method: 'POST',
      url: '/api/users',
      params: {
        email: data.email,
        username: data.username,
        password: data.password
      }
    });
  };

  return {
    findUser: findUser,
    createUser: createUser
  }
})