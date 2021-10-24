const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy; 

const User = require('../models/users');

//authentication using passport
passport.use(new LocalStrategy ({
    usernameField: 'email',
    passReqToCallback: true
},
function(req,email,password,done){
    // find a user and establish the identity
    User.findOne({email: email}, function(err,user){
        if(err){ 
        req.flash('error', err);
         return done(err);
        }
        if(!user || user.password != password){
            // req.flash('error','Invalid Username/password');
            return done(null,false);
        }
        
        return done(null,user);
    });
}
));

//serialixzing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('errror in finding user');
            return done(err);
        }
        return done(null,user);
    });
});

//check if user is authenticated
passport.checkAuthentication= function(req,res,next){
    if(req.isAuthenticated())
    {
        console.log(req.user); 
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        //req.user cintains the cirrent signed in user from the session cookie and we are just sending this to the local views
        console.log(req.user); 
        res.locals.user= req.user;
    }
    next();
}


module.exports=passport;
