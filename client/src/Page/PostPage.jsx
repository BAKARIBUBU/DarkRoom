import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts, getComments, createPostWithMovie } from '../api/api';
import CreatePostForm from '../components/Post/CreatePostForm';
import PostList from '../components/Post/PostList';
import CommentForm from '../components/Comment/CommentForm';
import CommentList from '../components/Comment/CommentList';

const PostPage = ({ userId, clubId }) => {
  const { postId } = useParams(); // Get postId from URL params (if provided)

  const [posts, setPosts] = useState([]); // List of posts
  const [post, setPost] = useState(null); // Selected post details
  const [comments, setComments] = useState([]); // Comments for the selected post
  const [refreshPosts, setRefreshPosts] = useState(false); // Trigger for refreshing posts
  const [refreshComments, setRefreshComments] = useState(false); // Trigger for refreshing comments
  const [showCreatePost, setShowCreatePost] = useState(false); // State to toggle the CreatePostForm

  // Fetch posts when the page loads or when posts are refreshed
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        console.log(postsData.data);
        
        setPosts(postsData.data.data); // Assuming your API returns posts in `data`

        // If postId exists, fetch the selected post
        if (postId) {
          const selectedPost = postsData.data.find((p) => p.id === parseInt(postId));
          setPost(selectedPost);

          // Fetch comments for the selected post
          const commentsData = await getComments(postId);
          setComments(commentsData.data);
        }
      } catch (error) {
        console.error('Error fetching posts or comments:', error);
      }
    };

    fetchPosts();
  }, [postId, refreshPosts, refreshComments]);

  // Handle post creation
  const handlePostCreated = () => {
    setRefreshPosts((prevState) => !prevState); // Refresh the posts list after a new post is created
  };

  // Handle comment creation
  const handleCommentAdded = () => {
    setRefreshComments((prevState) => !prevState); // Refresh the comments after a new comment is added
  };

  // Toggle visibility of the Create Post form
  const handleCreatePostToggle = () => {
    setShowCreatePost(!showCreatePost);
    console.log("Show Create Post form:", !showCreatePost);
  };

  // If postId is provided but the selected post is still loading
  if (postId && !post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-page">
      <h1>{postId ? 'Post Details' : 'Posts'}</h1>

      {/* Create Post Button (only shown if postId is not provided) */}
      {!postId && (
        <button 
          className="create-post-button"
          onClick={handleCreatePostToggle}
        >
          Create Post
        </button>
      )}

      {/* Create Post Form (Only show if postId is not provided and showCreatePost is true) */}
      {!postId && showCreatePost && (
        <CreatePostForm 
          userId={userId} 
          clubId={clubId} 
          onPostCreated={handlePostCreated} 
        />
      )}

      {/* List of Posts (Only show if postId is not provided) */}
      {!postId && <PostList posts={posts} />}

      {/* Post Details and Comments Section (Only show if postId is provided) */}
      {postId && post && (
        <>
          <h2>{post.content}</h2>
          {post.movie && (
            <div className="movie-info">
              <img 
                src={post.movie.poster_url || '/default-image.jpg'} 
                alt={post.movie.title} 
                className="movie-poster"
              />
              <h3>{post.movie.title}</h3>
            </div>
          )}
          <div className="post-details">
            <p className="text-sm text-gray-600">Club: {post.club?.description || 'N/A'}</p>
            <p className="mt-4 text-sm">Posted by: {post.user?.email || 'Anonymous'}</p>
          </div>

          {/* Comments Section */}
          <CommentList comments={comments} />
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        </>
      )}
    </div>
  );
};

export default PostPage;
