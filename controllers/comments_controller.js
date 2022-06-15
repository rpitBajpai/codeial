const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    // find whether the post exists, to  which the commnet needs to be added
    Post.findById(req.body.post, function(err, post){

        if(err){
            console.log('error in finding the post')
        }

        if(post){
            Comment.create({
                content: req.body.content,
                Post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('error in creating a comment')
                }
                // adding this comment to the COMMENTS ARRAY available in post schema
                post.comments.push(comment);
                // save to database after update
                post.save();

                res.redirect('/');
            });
        }
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');

        }
    });  
}