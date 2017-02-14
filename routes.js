//require schemas from Models folder
<<<<<<< HEAD
var model = require('./models.js')
=======
var model = require('./models.js');
<<<<<<< HEAD
>>>>>>> Add json web token dependency and set up framework
=======
var jwt = require('jwt-simple');
>>>>>>> Add to jwt functionality

//export routes to app file
module.exports = function(app, express) {

  // ADD NEW USER
  app.post('/api/signup/', function(req, res) {
    var newUser = new model.User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;

    // CHECK IF USER ALREADY EXISTS
    model.User.findOne({username: newUser.username}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          newUser.save(function (err) {
            if (err) {
              console.log(err);
            } else {
<<<<<<< HEAD
              res.status(200).send(newUser);
=======
              console.log('New user created.');
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
              // res.status(200).send(newUser);
>>>>>>> Add to jwt functionality
            }
          });
        } else {
          res.status(200).send('User already exists.');
        }
      }
    });
  });

  // LOGIN TO ACCOUNT
  app.post('/api/login/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    model.User.findOne({username: username}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          // USER DOES NOT EXIST
          res.redirect('/');
        } else {
<<<<<<< HEAD
          if (user.password === password) {
<<<<<<< HEAD
<<<<<<< HEAD
            res.status(200).send(user);
=======
            // CREATE SESSION
            res.redirect('/dashboard');
>>>>>>> Add json web token dependency and set up framework
          } else {
            // INCORRECT PASSWORD
            res.redirect('/');
=======
            window.sandpiperId = user._id;
=======
          // COMPARE PASSWORDS
          if (user.password === password) {
>>>>>>> Incorporate json web tokens to restrict access to other pages
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          } else {
            console.log('Incorrect Password.');
>>>>>>> Add to jwt functionality
          }
        }
      }
    });
  });

  // CHECK IF USER IS LOGGED IN
  app.get('/api/signedin', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) {
      console.log('No Token.');
    } else {
      var user = jwt.decode(token, 'secret');
      model.User.findOne({username: user.username})
        .then(function(user) {
          if (user) {
            res.send(user);
          } else {
            res.send(401);
          }
      });
    }
  });

  // GET USER BY USERNAME
  app.get('/api/users/:username/', function(req, res) {
    var username = req.params.username;
    model.User.findOne({username: username}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(user);
      }
    });
  });

  // ADD NEW SITE TO USER
  app.post('/api/users/:id/sites/', function(req, res) {
    var userId = req.params.id;

    var newSite = new model.Site();
    newSite._user = userId;
    newSite.url = req.body.url;
    newSite.title = req.body.title;
    newSite.date = Date();

    newSite.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        model.User.findById(userId, function(err, user) {
          user.sites.push(newSite);
          user.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send(newSite);
            }
          });
        });
      }
    });
  });

  // GET ALL USER SITES
  app.get('/api/users/:id/sites', function(req, res) {
    var userId = req.params.id;
    model.Site.find({_user: userId}, function(err, sites) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(sites);
      }
    });
  });

  // GET SPECIFIC SITE
  app.get('/api/sites/:id/', function(req, res) {
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
    var siteId = req.params.id;

    var url = req.body.url;
    var date = Date();

    model.linkClickModel.findOne({url: url, _site: siteId}, function(err, click) {
    // IF CLICK ENTRY ALREADY IN DATABASE, ADD TO IT
      if (click) {
        click.count ++;
        click.date.push(date);
        click.save();
        res.status(200).send('Click updated.');
      } else {
    // OTHERWISE CREATE NEW CLICK ENTRY
        var newClick = new model.linkClickModel();
        newClick._site = siteId;
        newClick.url = url;
        newClick.count = 1;
        newClick.date = [date];

        newClick.save(function (err) {
          if (err) {
            console.log(err);
          } else {
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

  // GET ALL CLICKS FOR SITE
  app.get('/api/sites/:id/clicks/', function(req, res) {
    var siteId = req.params.id;
    model.linkClickModel.find({_site: siteId}, function(err, clicks) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(clicks);
      }
    });
  });

  // GET SPECIFIC SITE CLICK
  app.get('/api/clicks/:id/', function(req, res) {
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
    var siteId = req.params.id;

    var title = req.body.title;
    var date = Date();

    model.pageViewModel.findOne({title: title, _site: siteId}, function(err, view) {
    // IF VIEW ENTRY EXISTS IN DATABASE, ADD TO IT
      if (view) {
        view.count ++;
        view.date.push(date);
        view.save();
        res.status(200).send('view updated.');
      } else {
    // OTHERWISE CREATE NEW VIEW ENTRY
        var newView = new model.pageViewModel();
        newView._site = siteId;
        newView.title = title;
        newView.count = 1;
        newView.date = [date];

        newView.save(function (err) {
          if (err) {
            console.log(err);
          } else {
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

  // GET ALL VIEWS FOR SITE
  app.get('/api/sites/:id/views/', function(req, res) {
    var siteId = req.params.id;
    model.pageViewModel.find({_site: siteId}, function(err, views) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(views);
      }
    });
  });

  // GET SPECIFIC SITE VIEW
  app.get('/api/views/:id/', function(req, res) {
    var viewId = req.params.id;
    model.pageViewModel.findById(viewId, function(err, view) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(view);
      }
    });
  });

<<<<<<< HEAD
};
=======
};




>>>>>>> Add json web token dependency and set up framework
