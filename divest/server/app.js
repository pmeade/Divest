const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');

const app = express();

const GOOGLE_CLIENT_ID = '1039781789392-c1ffgulvop1qbk2vilbti9la0ci0qudb.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Configure Passport
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save user profile to session
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/feed');
});

app.get('/feed', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../client/feed.html'));
});

// Add route for root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Add endpoint to check authentication status
app.get('/auth/check', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

app.get('/api/posts', (req, res) => {
    // Example posts data
    const posts = [
        { text: 'Post 1', category: 'want' },
        { text: 'Post 2', category: 'think' },
        { text: 'Post 3', category: 'fact' },
        { text: 'Post 4', category: 'choose' }
    ];
    res.json(posts);
});

app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});