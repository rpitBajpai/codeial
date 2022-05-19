const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const expressLayouts= require('express-ejs-layouts');

app.use(express.static('./assets'));

// extract style & scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayouts);

// use express router
app.use('/', require('./routes/index'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views' );

app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);

});