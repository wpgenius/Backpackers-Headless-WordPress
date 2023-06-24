import React from 'react';
import '../assets/css/BlogPost.css';
import { Link } from "react-router-dom";

const BlogPost = ({ post }) => {
  const truncatedContent = post.content.rendered.substring(0, 100) + '...';
  const imageUrl = post.yoast_head_json.og_image[0].url;
  return (
    <div className="col-md-3 mb-4">
      <div className="card post-container">
        <img src={imageUrl} className="card-img-top" alt={post.title.rendered} />
        <div className="card-body post-content">
          <h5 className="card-title">{post.title.rendered}</h5>
          <h6 className="card-author">{post.yoast_head_json.author}</h6>
          <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        </div>
        <Link to={`/blog/${post.id}`} className="btn btn-primary read-more">Read More</Link>
      </div>
    </div>
  );
};

export default BlogPost;
