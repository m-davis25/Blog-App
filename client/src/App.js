import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login.js';
import Layout from './Layout/Layout.js';
import IndexPage from './Pages/IndexPage';
import Register from './Components/Register';
import { UserContextProvider } from './UserContext.js';
import CreatePosts from './Pages/CreatePosts.js';
import PostPage from './Pages/PostPage.js';
import './App.css';
import './Pages/Posts.css';
import EditPost from './Pages/EditPost.js';





function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePosts />} />
          <Route path='/posts/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
