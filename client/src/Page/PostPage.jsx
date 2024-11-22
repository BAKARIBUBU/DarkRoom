import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts, getComments, FollowUser, CheckFollowStatus } from '../api/api'; // Import CheckFollowStatus
import PostList from '../components/Post/PostList';
import CommentForm from '../components/Comment/CommentForm';
import CommentList from '../components/Comment/CommentList';

const PostPage = () => {
  const { postId } = useParams();

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [refreshPosts] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);

        if (postId) {
          const selectedPost = postsData.find(
            (p) => p.id === parseInt(postId)
          );
          setPost(selectedPost);

          const commentsData = await getComments(postId);
          setComments(Array.isArray(commentsData) ? commentsData : []);

          // Check if the current user is following the post's user
          const followingStatus = await CheckFollowStatus(selectedPost.user.id);
          setIsFollowing(followingStatus);
        }
      } catch (error) {
        console.error('Error fetching posts or comments:', error);
      }
    };

    fetchPosts();
  }, [postId, refreshPosts, refreshComments]);

  const handleCommentAdded = () => {
    setRefreshComments((prev) => !prev);
  };

  const handleFollowUser = async () => {
    if (post && post.user) {
      try {
        await FollowUser(post.user.id); // Call the FollowUser API
        setIsFollowing(true); // Update follow status

        // Optionally, persist the follow status in localStorage for the next page load
        localStorage.setItem(`isFollowing_${post.user.id}`, 'true');
      } catch (error) {
        console.error('Error following user:', error);
      }
    }
  };

  useEffect(() => {
    if (post && post.user) {
      // Check the follow status when the post is loaded (on page load or reload)
      const persistedFollowStatus = localStorage.getItem(`isFollowing_${post.user.id}`);
      if (persistedFollowStatus === 'true') {
        setIsFollowing(true); // Set the follow status from localStorage if it exists
      }
    }
  }, [post]);

  if (postId && !post) {
    return <div className="text-center text-xl">Loading post...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {postId ? 'Post Details' : 'Posts'}
      </h1>

      {!postId && <PostList posts={posts} />}

      {postId && post && (
        <>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.content}</h2>
            {post.movie && (
              <div className="movie-info mb-6">
                <img
                  src={post.movie.poster_url || '/default-image.jpg'}
                  alt={post.movie.title}
                  className="w-10 h-10 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700">{post.movie.title}</h3>
              </div>
            )}
            <div className="post-details">
              <p className="text-sm text-gray-600">Club: {post.club?.name || 'N/A'}</p>
              <p className="mt-2 text-sm text-gray-600">Posted by {post.user?.username || 'Anonymous'}</p>
            </div>
            <button
              onClick={handleFollowUser}
              className={`mt-4 px-4 py-2 text-white ${isFollowing ? 'bg-gray-400' : 'bg-blue-500'} rounded`}
              disabled={isFollowing}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          <div className="mt-8">
            <CommentList comments={comments} />
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostPage;
