const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }); 
                // adding this comment to the COMMENTS ARRAY available in post schema
                post.comments.push(comment);
                // save to database after update
                post.save();

                comment = await comment.populate('user', 'name email').execPopulate();
                commentsMailer.newComment(comment);

                if(req.xhr){

                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
                req.flash('success', 'Comment Published!');
                res.redirect('/');
            };
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return;
    }
    // find whether the post exists, to  which the commnet needs to be added
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment= await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post= Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment ID which was deleted back to the views
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
                req.flash('success', 'Comment deleted!');
                return res.redirect('back');
            
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');

        }
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return;
    }
}
      
