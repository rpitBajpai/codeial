const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating a post');
        }
        return res.redirect('back');
    });
};

module.exports.destroy = function(req,res){
    // Search whether posts exists, by getting post ID through params
    Post.findById(req.params.id, function(err, post){
        // authorization - check so that only owner user can delete his post
        // .id means converting the object id into strings
            if(post.user == req.user.id){
                post.remove();
                // delete all comments associated with that post
                Comment.deleteMany({post: req.params.id}, function(err){
                    return res.redirect('back');
                });
        } else{
            return res.redirect('back');
        }
    });
}