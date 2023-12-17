import React, { useEffect, useState } from 'react'
import Post from './Post';
import { fetchUserPosts, likePost, unlikePost } from '../services/PostService';

const UserPosts = () => {
  const [user, setUser] = useState()
  const [liked, setLiked] = useState(false);
  const id = localStorage.getItem("userId");
  const fetchUserPostsData = async () => {
    try {
      const data = await fetchUserPosts(id);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlikePost = async (postId) => {
    try {
      await unlikePost(postId);
      setLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserPostsData();
  }, []);
   return (
    <div>
     {user && user.posts && user.posts.map((post,index)=>(
        <Post 
        id={post._id}
        isUser={true}
        key={index}
        title={post.title} 
        like_count={post.like_count}
        description={post.description}
        image={post.image} 
        userName={user.name}
        liked={liked}
        handleLikePost={handleLikePost}
        handleUnlikePost={handleUnlikePost} />
       ))}
    </div>
  )
}

export default UserPosts
//------

// import React, { useEffect, useState } from 'react';
// import Post from './Post';
// import { fetchUserPosts } from '../services/PostService';

// const UserPosts = () => {
//   const [user, setUser] = useState();
//   const userId = localStorage.getItem("userId");

  // const fetchUserPostsData = async () => {
  //   try {
  //     const data = await fetchUserPosts(userId);
  //     setUser(data.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserPostsData();
  // }, []);

//   return (
//     <div>
//       {user && user.posts && user.posts.map((post, index) => (
//         <Post 
//           id={post._id}
//           isUser={true}
//           key={index}
//           title={post.title} 
//           description={post.description}
//           image={post.image} 
//           userName={user.name}
//         />
//       ))}
//     </div>
//   );
// };

// export default UserPosts;
