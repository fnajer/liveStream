const express = require('express'),
    Session = require('express-session'),
    mongoose = require('mongoose'),
    path = require('path'),
    middleware = require('connect-ensure-login'),
    FileStore = require('session-file-store')(Session),
    config = require('./config/default'),
    flash = require('connect-flash'),
    port = config.server.port,
    app = express(),
    passport = require('./auth/passport'),
    node_media_server = require('./media_server'),
    thumbnail_generator = require('./cron/thumbnails');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));
app.use('/thumbnails', express.static('server/thumbnails'));
app.use(flash());

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use(Session({
    store: new FileStore({
        path : './server/sessions'
    }),
    cookie: {
        httpOnly: false,
    },
    secret: config.server.secret,
    maxAge : Date.now() + (60 * 1000 * 30),
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/streams', require('./routes/streams'));
app.use('/settings', require('./routes/settings'));
app.use('/user', require('./routes/user'));
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});


app.get('*', middleware.ensureLoggedIn('/login'), (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`App listening on ${port}!`));
node_media_server.run();
thumbnail_generator.start();