import React, { useEffect, useState } from 'react';
import Post from './Post';
import { fetchPosts, likePost, unlikePost } from '../services/PostService';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  
  const [liked, setLiked] = useState(false);
  const loadPosts = async (page) => {
    try {
      const data = await fetchPosts(page, 3);
      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
      }
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadPosts(currentPage);  
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const nextPage = currentPage + 1;
      if (nextPage <= totalPages) {
        loadPosts(nextPage);
      }
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, totalPages]);

  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={post._id}
          id={post._id}
          isUser={localStorage.getItem("userId") === post.user._id}
          title={post.title}
          description={post.description}
          image={post.image}
          like_count={post.like_count}
          userName={post.user.name}
          liked={liked}
          handleLikePost={handleLikePost}
          handleUnlikePost={handleUnlikePost}      
          >
          </Post>
        ))}
      </div>
    );
  };
  
  export default Posts;





//--------------Pagination-------------------

// const Posts = () => {
//   const [posts, setPosts] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState();

//   const sendRequest = async (page, limit) => {
//     const res = await axios.get(`http://localhost:5000/api/post?page=${page}&limit=${limit}`)
//     .catch(error => console.log(error));
//     const data = await res.data;
//     return data;
//   };

//   useEffect(() => {
//     sendRequest(currentPage, 3)
//       .then((data) => {
//         setPosts(data.posts);
//         setTotalPages(data.totalPages);
//       });
//   }, [currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       {posts && posts.map((post, index) => (
//         <Post
//           key={post._id}
//           id={post._id}
//           isUser={localStorage.getItem("userId") === post.user._id}
//           title={post.title}
//           description={post.description}
//           image={post.image}
//           userName={post.user.name}
//         />
//       ))}

//       <div  className="d-flex justify-content-center">
//         <Pagination style={{padding: '2rem', margin: 'auto'}}>
//           <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
//           {[...Array(totalPages)].map((_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === currentPage}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default Posts;










