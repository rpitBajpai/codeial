const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
//    return res.end('<h1>Express is up for Codeial!</h1>'); -------sending data to browser directly

//  show all the posts
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         posts: posts
    // });
    
//  show all the posts & populate the user of each post
        Post.find({}).populate('user').exec(function(err, posts){
            return res.render('home', {
                title : "Codeial | Home",
                posts: posts
        });
    });

    // Comment.find({}, function(err, comments){
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         comments: comments
    //     });
    // });
};