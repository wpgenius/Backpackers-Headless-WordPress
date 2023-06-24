import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import '../assets/css/BlogList.css'

function BlogList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(null);
    const [allLoaded, setAllLoaded] = useState(false);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const response = await fetch(`https://wpgenius.in/wp-json/wp/v2/posts?page=${currentPage}&per_page=10&_embed`);
        const newPosts = await response.json();
        const sortedNewPosts = newPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        const allSortedPosts = [...posts, ...sortedNewPosts];
        setPosts(allSortedPosts);
        setLoading(false);
        setTotalPages(parseInt(response.headers.get('X-WP-TotalPages')));
        if (currentPage === parseInt(response.headers.get('X-WP-TotalPages'))) {
          setAllLoaded(true);
        }
      };
  
      fetchPosts();
    }, [currentPage]);

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

  return (
    <>
    <section className='first mb-4'>
       <div className='container firstcontainer'> <div className='rowfirst'><h1 className="text-center">THESE ARE THE BLOG FOR THE HEALTH AND CARE OF CHILDREN</h1>
       </div>
       </div>
    </section>
    <section>
    <div className='container'>
    <div className="row">
      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
    {loading && currentPage < totalPages && <p className="text-center">Loading...</p>}
    {allLoaded && <p className="text-center">All blog posts loaded.</p>}
    </div>
    </section>
    </>
  );
};

export default BlogList;
