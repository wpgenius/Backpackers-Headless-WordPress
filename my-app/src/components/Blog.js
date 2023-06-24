import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/Blog.css'
const FullBlogPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPost = async () => {
        const response = await fetch(`https://wpgenius.in/wp-json/wp/v2/posts/${postId}?_embed`);
        const post = await response.json();
        setPost(post);
        setLoading(false);
      };
  
      fetchPost();
    }, [postId]);

    if (loading) {
      return <p>Loading...</p>;
    }
                              
    return (
      <div className="container">
        <h1 className="text-center">{post.title.rendered}</h1>
        <img src={post.yoast_head_json.og_image[0].url} alt={post.title.rendered} className="img-fluid" />
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    );
  };
  
  export default FullBlogPost;