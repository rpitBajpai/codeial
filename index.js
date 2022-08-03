const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts= require('express-ejs-layouts');
const db = require('./config/mongoose');
//  used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt- strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//  We need SCSS files to be pre-complied, just before the server starts
app.use(sassMiddleware({
    // From where to pickup SCSS files to convert it to CSS
    src: './assets/scss',
    // Where to put converted CSS files
    dest: './assets/css',
    // Display error when files are not converted from SCSS to CSS during compilation/put as FALSE, when using in production
    debug: true,
    //  Want everything in single/multiple lines
    outputStyle: 'extended',

    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// make the uploads path availabe to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// extract style & scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views' );

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //  TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // mongo store is used to store the session cookie in the db
    
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes/index'));


app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);

});