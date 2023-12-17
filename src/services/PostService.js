import axios from 'axios';
import { ADD_POST,
    ADD_POST_COMMENT,
    DELETE_POST, 
    DELETE_POST_COMMENT, 
    GET_USER_BY_ID, 
    LIST_POST_COMMENT, 
    POST_LIKE, 
    POST_LIST, 
    POST_UNLIKE,
   SINGLE_POST_DETAIL,
   UPDATE_POST,
   UPDATE_POST_COMMENT, 
   USER_POST_LIST} from '../config/RestApi';

export const fetchPosts = async (page, limit) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${POST_LIST}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts. Please try again.');
    }
  };
  
export const addPostAPI = (formData) => {
  const token = localStorage.getItem('token');

  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(ADD_POST, formData, config);
      resolve(response.data);
    } catch (error) {
      console.error('Error adding post:', error);
      const commonModel = {
        status: false,
        message: 'Something went wrong, please try again later',
      };
      reject(commonModel);
    }
  });
};

export const getUserList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(GET_USER_BY_ID);
        resolve(response.data.users); // Assuming the response has a 'users' property
      } catch (error) {
        console.error('Error fetching user list:', error);
        const commonModel = {
          status: false,
          message: 'Something went wrong while fetching user data',
        };
        reject(commonModel);
      }
    });
  };

  export const singlePostDetails = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      const response = await axios.get(`${SINGLE_POST_DETAIL}/${id}`, config);
      return response.data.post;
    } catch (error) {
      console.error('Error fetching post details:', error);
      throw new Error('Failed to fetch post details. Please try again.');
    }
  };

  export const updatePost = async (postId, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${UPDATE_POST}/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post. Please try again.');
    }
  };

export const fetchUserPosts = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${USER_POST_LIST}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new Error('Failed to fetch user posts. Please try again.');
  }
};


export const deletePost = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.delete(`${DELETE_POST}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post. Please try again.');
  }
};

export const likePost = async (postId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.post(`${POST_LIKE}/${postId}`, null, config);
  } catch (error) {
    console.error('Error liking post:', error);
    throw new Error('Failed to like post. Please try again.');
  }
};

export const unlikePost = async (postId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.post(`${POST_UNLIKE}/${postId}`, null, config);
  } catch (error) {
    console.error('Error unliking post:', error);
    throw new Error('Failed to unlike post. Please try again.');
  }
};

//Get All Comments:
export const fetchComments = async (postId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${LIST_POST_COMMENT}/${postId}`, config);
    return response.data.comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments. Please try again.');
  }
};

//Add Comment
export const addComment = async (postId, comment) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const newComment = { comment };
    const response = await axios.post(`${ADD_POST_COMMENT}/${postId}`, newComment, config);
    return response.data.comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment. Please try again.');
  }
};

//Delete comment
export const deleteComment = async (postId, commentId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(`${DELETE_POST_COMMENT}/${postId}/comment/${commentId}`, config);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment. Please try again.');
  }
};

//edit Comment
export const editComment = async (postId, commentId, updatedComment) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${UPDATE_POST_COMMENT}/${postId}/comment/${commentId}`,
      { comment: updatedComment },
      config
    );
    return response.data.comment;
  } catch (error) {
    console.error('Error editing comment:', error);
    throw new Error('Failed to edit comment. Please try again.');
  }
};
