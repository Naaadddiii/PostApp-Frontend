import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts";
import PostDetail from "./components/PostDetail";
import AddPost from "./components/AddPost";
import { useSelector } from "react-redux";

function App(){
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [showAuth, setShowAuth] = useState(false); // New state to control Auth component visibility

  const toggleAuth = () => {
    setShowAuth(!showAuth);
  };
    console.log(isLoggedIn);
  
  return (
    <React.Fragment>
            <header>
            <Header onLoginClick={toggleAuth} />
            </header>
            <main>
              <Routes>
                <Route path="/auth" element= {showAuth && <Auth />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/add" element={<AddPost />} />
                <Route path="/myPosts" element={<UserPosts />} />
                <Route path="/myPosts/:id" element={<PostDetail />} />                
              </Routes>
            </main>
    </React.Fragment>

  )
}

export default App;







// //https://bitbucket.org/post-app/post-app/src/master/
