
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;


passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
  scope: 'user:email'
},
  function (accessToken, refreshToken, profile, done) {
    const userData = {
      accessToken: accessToken,
      provider: profile.provider,
      user: {
        id: profile._json.id,
        avatar: profile._json.avatar_url,
        username: profile._json.given_name,
        email: profile.emails[0].value,
        phone: '',
        isActivated: true,
        admin: false,
        profileUrl: profile.profileUrl
      }
    }
    done(null, userData)
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
        id: profile._json.sub,
        avatar: profile._json.picture,
        username: profile._json.given_name,
        email: profile._json.email,
        phone: '',
        isActivated: true,
        admin: false,
        profileUrl: 'https://myaccount.google.com/'
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