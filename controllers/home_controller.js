const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.home = async function(req,res){
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
        
    try{
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
           let users= await User.find({});

                return res.render('home', {
                    title : "Codeial | Home",
                    posts: posts,
                    all_users: users
            });
    }catch(err){
        console.log('Error', err);
        return;
    }
};


// using then - dummy code for explanation
// Post.find({}).populate('comments).then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()