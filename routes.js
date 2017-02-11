//require schemas from Models folder
var model = require('./models.js')

//export routes to app file
module.exports = function(app, express) {


// ****************************************
// *** NEW ROUTES *************************
// ****************************************

  // ADD NEW USER
  app.post('/api/users/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var newUser = {
      username: username,
      password: password,
      email: email
    };
    console.log('Creating New User:', newUser);
    model.User.create(newUser, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("Saved to DB.");
      }
    });
  });

  // GET USER
  app.get('/api/users/:id/', function(req, res) {
    console.log('Finding User...');
    var userId = req.params.id;
    model.User.findById(userId, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(user);
      }
    });
  });

  // ADD NEW SITE TO USER
  app.post('/api/users/:id/sites/', function(req, res) {
    console.log('Adding Site...');
    var userId = req.params.id;

    var newSite = new model.Site();
    newSite._user = userId;
    newSite.url = req.body.url;
    newSite.title = req.body.title;

    newSite.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Site saved to DB.');
        model.User.findById(userId, function(err, user) {
          user.sites.push(newSite);
          user.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send("Site saved to user.");
            }
          });
        });
      }
    });
  });

  // GET SITE
  app.get('/api/sites/:id/', function(req, res) {
    console.log('Finding Site...');
    var siteId = req.params.id;
    model.Site.findById(siteId, function(err, site) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(site);
      }
    });
  });

  // ADD NEW SITE CLICK
  app.post('/api/sites/:id/clicks/', function(req, res) {
    console.log('Adding Click...');
    var siteId = req.params.id;

    var url = req.body.url;
    var date = Date();

    model.linkClickModel.findOne({url: url, _site: siteId}, function(err, click) {
      // if click already in database, add to entry
      if (click) {
        console.log('Matching click:', click);
        click.count ++;
        click.date.push(date);
        click.save();
        res.status(200).send('Click updated.');
      } else {
        // otherwise make new entry
        console.log('No matching click found.');
        var newClick = new model.linkClickModel();
        newClick._site = siteId;
        newClick.url = url;
        newClick.count = 1;
        newClick.date = [date];

        newClick.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Click saved to DB.');
            model.Site.findById(siteId, function(err, site) {
              site.clicks.push(newClick);
              site.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).send("Click saved to site.");
                }
              });
            });
          }
        });
      }
    });
  });

  // GET SITE CLICK
  app.get('/api/clicks/:id/', function(req, res) {
    console.log('Finding Click...');
    var clickId = req.params.id;
    model.linkClickModel.findById(clickId, function(err, click) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(click);
      }
    });
  });

  // ADD NEW SITE VIEW
  app.post('/api/sites/:id/views/', function(req, res) {
    console.log('Adding View...');
    var siteId = req.params.id;

    var title = req.body.title;
    var date = Date();

    model.pageViewModel.findOne({title: title, _site: siteId}, function(err, view) {
      // if view already in database, add to entry
      if (view) {
        console.log('Matching view:', view);
        view.count ++;
        view.date.push(date);
        view.save();
        res.status(200).send('view updated.');
      } else {
        // otherwise make new entry
        console.log('No matching view found.');
        var newView = new model.pageViewModel();
        newView._site = siteId;
        newView.title = title;
        newView.count = 1;
        newView.date = [date];

        newView.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('View saved to DB.');
            model.Site.findById(siteId, function(err, site) {
              site.views.push(newView);
              site.save(function(err) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).send("View saved to site.");
                }
              });
            });
          }
        });
      }
    });
  });

  // GET SITE VIEW

// ****************************************
// ****************************************
// ****************************************


  /* linkClick route */
  //GET request for all data
  app.get('/linkClickAll', function(req, res) {
    //find all urls in database
    model.linkClickModel.find({}, function(err, links) {
      if(err) {
        throw err;
      } else {
        res.status(200).send(links);
      }
    });
  });

  //GET request for a specified url
  app.get('/linkClick', function(req, res) {
    //pull url from query
    var url = req.query.url;
    //find url in database
    model.linkClickModel.findOne({url: url}, function(err, link) {
      if(err) {
        throw err;
      } else {
        res.status(200).send(link);
      }
    });
  });

  //POST request
  app.post('/linkClick', function(req, res) {
    //pull url from request body
    var url = req.body.url;
    //create new timestamp
    var date = Date();
    //check if url exists in database
    model.linkClickModel.findOne({url: url}, function(err, link) {
      //if it exists, update count and add timestamp
      if(link) {
        link.count++;
        link.date.push(date);
        link.save();
        res.status(200).send("Successfully updated link count")
      //if not, create new record, set count to 1 and add timestamp (in array)
      } else {
        model.linkClickModel.create({
          url: url,
          count: 1,
          date: [date]
        }, function(err) {
          if(err) {
            throw err;
          } else {
            res.status(200).send("Successfully created new link record");
          }
        });
      }
    });
  });

  /* pageView route */
  //GET request for a specified page
  app.get('/pageViewAll', function(req, res) {
    //find all pages in database
    model.pageViewModel.find({}, function(err, pages) {
      if(err) {
        throw err;
      } else {
        res.status(200).send(pages);
      }
    });
  });

  //GET request for a specified page
  app.get('/pageView', function(req, res) {
    //pull title from query
    var title = req.query.title;
    //find title in database
    model.pageViewModel.findOne({title: title}, function(err, page) {
        if(err) {
        throw err;
      } else {
        res.status(200).send(page);
      }
    });
  });

  //POST request
  app.post('/pageView', function(req, res) {
    //pull title from request body
    var title = req.body.title;
    //create new timestamp
    var date = Date();
    //check if title exists in database
    model.pageViewModel.findOne({title: title}, function(err, page) {
      //if it exists, update count and add timestamp
      if(page) {
        page.count++;
        page.date.push(date);
        page.save();
        res.status(200).send("Successfully updated page count")
      //if not, create new record, set count to 1 and add timestamp (in array)
      } else {
        model.pageViewModel.create({
          title: title,
          count: 1,
          date: [date]
        }, function(err) {
          if(err) {
            throw err;
          } else {
            res.status(200).send("Successfully created new page record");
          }
        });
      }
    });
  });

};




