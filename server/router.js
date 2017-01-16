const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

const Restaurant = require('./models/restaurant');

module.exports = function(app){
  app.get('/', requireAuth, function(req,res){
    res.send({ message:'Super serect code is ABC123'});
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignIn, Authentication.signin);

  app.get('/restaurants', function(req, res) {
    Restaurant.find(function(err, restaurants) {
      if (err) res.send(err);
      res.json(restaurants);
    });
  });
}
