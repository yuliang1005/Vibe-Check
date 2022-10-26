import React, { useState, useEffect } from "react";
import { getPosts, createPost, addLike } from "../data/repository";
import moment from 'moment';
import ReactPaginate from "react-paginate";

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
export default function Forum(props) {
    const [post, setPost] = useState('');
    const [image, setImage] = useState('');
    const [relateid, setRelateid] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [page, setPage] = useState(0);

    // Load posts.
    async function loadPosts() {
        const currentPosts = await getPosts();
        console.log('currentPosts', currentPosts)
        setPosts(currentPosts);
        setIsLoading(false);
    }
    useEffect(() => {
        loadPosts();
    }, []);

    const getFileName = (o) =>{
        var pos= o.lastIndexOf("\\");
        return o.substring(pos+1);  
    }

    //handle textbox change
    const handleInputChange = (event) => {
        setPost(event.target.value);
    };
    const handleImageChange = (event) => {
        const name = getFileName(event.target.value);
        setImage(name);
    };
    const handleRelateidChange = (event) => {
        setRelateid(event.target.value);
    };

    //add post and comment
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Trim the post text.
        const trimmedPost = post.trim();
        if (trimmedPost === "") {
            setErrorMessage("A post cannot be empty.");
            return;
        }
        // Create post.
        const newPost = { text: trimmedPost, username: props.user.username, image: image, time: moment().format('DD/MM/YYYY HH:mm'), relateid: relateid };
        console.log(newPost);
        await createPost(newPost);
        // Add post to locally stored posts.
        setPosts([...posts, newPost]);

        // Reset post content.
        setPost("");
        setRelateid(null)
        setVisible(visible)
        setErrorMessage("");
        loadPosts();
    };

    //handle like post
    const handleLike = (event) => {
        event.preventDefault();

        const likeinfo = {post_id: relateid, username: props.user.username};
        console.log(likeinfo);
        addLike(likeinfo);
    }

    //handle pagination
    const handlePageClick = (data) => {
        setPage(data.selected);
      };

    const pageSize = 10;
    const pageCount = Math.ceil(posts.length / pageSize);
    const offset = page * pageSize;
    const postsToDisplay = posts.slice(offset, offset + pageSize);

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>New Post</legend>
                    <div className="form-group">
                        <textarea name="post" id="post" className="form-control" rows="3"
                            value={post} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="file" id="post-image" name="post-image" accept="image/png,image/jpeg" onChange={handleImageChange} />
                    </div>
                    {errorMessage !== null &&
                        <div className="form-group">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                    }
                    <div className="form-group">
                        <input type="button" className="btn btn-danger mr-5" value="Cancel"
                            onClick={() => { setPost(""); setErrorMessage(null); loadPosts(); }} />
                        <input type="submit" className="btn btn-primary" value="Post" />
                    </div>
                </fieldset>
            </form>

            <hr />
            <h1>Posts</h1>
            <div>
                {isLoading ?
                    <div>Loading posts...</div>
                    :
                    posts.length === 0 ?
                        <span className="text-muted">No posts have been submitted.</span>
                        :
                        postsToDisplay.map((x, index) =>
                        <div>
                        {x.relateid == null &&
                            <div className="post-content" key={index}>
                                <h3>{x.username}</h3>
                                <small>{x.time}</small>
                                <p>{x.text}</p>
                                {x.image == null || x.image === "" ?
                                    <p></p>
                                    :
                                    <img className="post-image" src={'/images/' + x.image} alt={x.text} />
                                }
                                <div>
                                <form onSubmit={handleLike}>
                                    <input name="postId" id="postId" type="hidden" value={x.post_id} onChange={handleRelateidChange} />
                                    <button className="like-btn" onClick={() => {setRelateid(x.post_id)}}>  
                                        <img className="like-img" src="heart.png" alt="like" />
                                    </button>
                                    </form>
                                    <button className="comment-btn" onClick={() => {setVisible(!visible);setRelateid(x.post_id)}}>
                                        <img className="comment-img" src="comment.png" alt="comment" />
                                    </button>
                                    {visible &&
                                        <form onSubmit={handleSubmit} className="comment-form">
                                            <input name="postId" id="postId" type="hidden" value={x.post_id} onChange={handleRelateidChange} />
                                            <textarea value={post} onChange={handleInputChange} col="3" ></textarea>
                                            <div className="form-group">
                                                <input type="file" name="post-image" accept="image/png,image/jpeg"  onChange={handleImageChange} />
                                            </div>
                                            {errorMessage !== null &&
                                                <div className="form-group">
                                                    <span className="text-danger">{errorMessage}</span>
                                                </div>
                                            }
                                            <button type="submit"><img className="comment-img" src="paper-plane.png" alt="comment" /></button>
                                        </form>
                                    }
                                </div>
                                <div>
                                    {postsToDisplay.map((comment, index) =>
                                        <div>
                                            {comment.relateid === x.post_id &&
                                            <div className="comment-content" key={index}>
                                            <h3>{comment.username}</h3>
                                            <small>{comment.time}</small>
                                            <p>{comment.text}</p>
                                            {comment.image == null || comment.image === "" ?
                                                <p></p>
                                                :
                                                <img className="post-image" src={'/images/' + comment.image} alt={comment.text} />                    
                                            }
                                            </div>
                                            }
                                        </div>
                                    )}
                                    </div>
                            </div>
                        }
                        </div>
                        )
                }
            </div>
            <ReactPaginate
                            onPageChange={handlePageClick}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            previousLabel="Previous"
                            nextLabel="Next"
                            breakLabel="..."
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            breakClassName="page-link"
                            activeClassName="active"
                          />
        </div>
    );
}
