import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getComments, getPosts } from "../api/api";
// import CommentForm from '../../Comment/CommentForm';
import CommentForm from "../components/Comment/CommentForm";  
import CommentList from "../components/Comment/CommentList";

const PostPage = () => {
  const { postId } = useParams();
  console.log(postId);
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await getPosts();
        console.log("Fetched posts:", postData);
        const posts = postData.data;
        setPost(posts.find((p) => p.id === parseInt(postId))); 
        
        const commentsData = await getComments(postId);
        console.log("Fetched comments:", commentsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);
  console.log(postId);
  

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-page">
      <h2>{post.content}</h2>
      {post.movie && (
        <div className="movie-info">
          <img src={post.movie.poster_url || '/default-image.jpg'} alt={post.movie.title} />
          <h3>{post.movie.title}</h3>
        </div>
      )}
      <CommentList comments={comments} />
      <CommentForm postId={postId} />
      <p className="text-sm text-gray-600">{post.club.description}</p>
      <p className="mt-4 text-sm">User: {post.user.email}</p>
    </div>
  );
};

export default PostPage;

