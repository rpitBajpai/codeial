// This .js file collects data from the form & sends it in JSON format to action
// Hence, while submiiting the form, POST shouldn't get submitted automatically
// Thus, it should be submitted via jQuery/AJAX
{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        // Prevent default submission of the form automatically
        newPostForm.submit(function(e){
             e.preventDefault();

            // Submit the form manually via AJAX
            $.ajax({
                type: 'post',
                url: '/posts/create',
                // send form data in JSON format
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">XX</a>
            </small>
            
            ${post.content} 
            <br>
            <small>
            ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
            
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type here to add commnet..." required>
                <input type="hidden" name="post" value="${post._id }">
                <input type="submit" value="Add Comment">
            </form>
    
            
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
    
            </div>
        </div>
    </li>`)
    }

    // method to delete a Post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console,log(error.responseText);
                }
            })
        })
    }

    createPost();
}