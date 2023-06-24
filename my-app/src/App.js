import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogList from './components/BlogList';
import FullBlogPost from './components/Blog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
       <Route path="/blogpage"element={<BlogList />}/>
       <Route path="/blog/:postId" element={<FullBlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
