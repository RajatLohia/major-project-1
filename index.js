const express= require('express');
const db=require('./config/mongoose');
const app= express();
const port= 8000;
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// const MongoStore = require('connect-mongo')(session);
const todo = require('./models/todo');
app.use(express.urlencoded());

//using our css file 
app.use(express.static('./assets'))

//use express router


//use our html file 
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'rajat',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
        
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
       // console.log("Error: ",err);
        console.log(`Error in running the server: ${err}`);              
    }
    console.log(`server is running on port: ${port}`);
})