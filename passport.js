
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;


passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
},
  function (accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
)
);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    const userData = {
      accessToken: accessToken,
      provider: profile.provider,
      user: {
        avatar: profile._json.picture,
        username: profile._json.given_name,
        email: profile._json.email,
        phone: '',
        isActivated: profile._json.email,
        admin: false,
        id: profile._json.sub
      }
    }
    done(null, userData)
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})