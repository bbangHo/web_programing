var db = require('../../db/db');
const bcrypt = require('bcryptjs');
var shortid = require('shortid');

module.exports = function (app) {
  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  /* 로그인 성공했을 때 세션 저장*/
  passport.serializeUser(function (user, done) {
    // console.log('serial',user);
    done(null, user.email);
  });

  passport.deserializeUser(function (email, done) {
    var user = db.get('users').find({ email: email }).value();
    //console.log(user);
    done(null, user);
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pw'
    },
    function (username, password, done) {
      var user = db.get('users').find({ email: username }).value();
      if (user) {
        bcrypt.compare(password, user.pw, function (err, result) {
          if (result) {
            return done(null, user, {
              message: 'Login Success!'
            });
          } else {
            return done(null, false, {
              message: 'Incorrect Password'
            });
          }
        });

      } else {
        return done(null, false, {
          message: 'Incorrect Data'
        });
      }
    }
  ));
  return passport;
}
