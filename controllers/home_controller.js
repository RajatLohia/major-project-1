const todo = require('../models/todo');
const category = require('../models/category');
const db = require('../config/mongoose');
const User = require('../models/users');

module.exports.auth = function(req, res){
    // return res.render('home',{
    //     title:"HOME"
    // });
    
    todo.find({},function(err,todos,user){
        if(err)
        {
            console.log('error in fetching contacts');
            return;
        }
    return res.render('auth',{
        title: user,
        todo_list: todos
        // ProfileUser:
        });
    });
}


module.exports.home = function(req, res){
    // return res.render('home',{
    //     title:"HOME"
    // });
    console.log(res.locals.user.name);
    const username= res.locals.user.name
    console.log(username);
    category.find({},function(err,categories){
        if(err)
        {
            console.log('error in fetching contacts');
            return;
        }

        todo.find({},function(err,todos){
            if(err)
            {
                console.log('error in fetching contacts');
                return;
            }
            const todo_listt= todos
            console.log(todo_listt);
            return res.render('home',{
                title:"TicTacticsToe",
                todo_list: todos,
                name: username,
                category_list: categories
                });
        })
    });
}
//creating a new task in the list 
module.exports.createe = function(req, res){

    console.log(req.body);
    todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err,newTask){
        if(err){
            console.log("error in creating a task");
            return res.redirect('back');
        }   
        console.log('******',newTask);
        return res.redirect('back');
    });
}

module.exports.createcategory = function(req, res){

    console.log(req.body);
    category.create({
        description: req.body.category,
    }, function(err,newTask){
        if(err){
            console.log("error in creating a new category");
            console.log(err);
            return res.redirect('back');
        }   
        console.log('******',newTask);
        return res.redirect('back');
    });
}

//deleting the selected task in list 
module.exports.delete = function(req, res){

    let id=req.query.id;
    //find the contact in the databse using id and delete
    todo.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deleting");
            return;
        }
    });
    return res.redirect('back');
}