const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // View the JSON data received from home_posts.js
        // check if the request is AJAX request
        if(req.xhr){
            // return JSON
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }


        req.flash('success', 'Post published!');
        return res.redirect('back');
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
    
};

module.exports.destroy = async function(req,res){

    try{
        let post= await Post.findById(req.params.id);
        // authorization - check so that only owner user can delete his post
        // .id means converting the object id into strings
            if(post.user == req.user.id){

                // CHANGE::delete the associated Likes for the post & also, delete all the likes associated with the comments of that post
                await Like.deleteMany({likeable: post, onModel: 'Post'});
                await Like.deleteMany({_id: {$in: post.comments}});


                post.remove();
                // delete all comments associated with that post
                await Comment.deleteMany({post: req.params.id});

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "Post deleted"
                    })
                }

                req.flash('success', 'Post & associated comments deleted!');
                return res.redirect('back');
                
        } else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
    // Search whether posts exists, by getting post ID through params
    
    }

    
