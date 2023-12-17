import {
  CardMedia,
  Typography,
  CardContent,
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Box,
  Collapse
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import PostComment from "./PostComment";
import {deletePost } from "../services/PostService";

const Post = ({
  title,
  description,
  image,
  userName,
  like_count,
  isUser,
  userAvatar,
  id,
  handleLikePost,
  handleUnlikePost,
}) => {
  const navigate = useNavigate();
  const [commentsVisible, setCommentsVisible] = useState(false);
  
  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleDelete = () => {
    deletePost(id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleEdit = (e) => {
    navigate(`/myPosts/${id}`);
  };
  console.log(description, image, isUser);

  const handleLike = () => {
    handleLikePost(id);
  };

  const handleUnlike = () => {
    handleUnlikePost(id);
  };
  
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleDelete} sx={{ marginLeft: "auto" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Box>
        )}
        {!isUser && (
          <Box display="flex">
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={
            <Typography sx={{ fontWeight: "bold" }}>{userName}</Typography>
          }
        />
        {image && (
          <CardMedia
            component="img"
            height="auto"
            image={`http://localhost:5000/uploads/${image}`}
          />
        )}
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {isUser && (
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleLike}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton onClick={handleUnlike}>
              <ThumbDownIcon />
            </IconButton>
            <Typography>{like_count} likes</Typography>
            <IconButton onClick={toggleComments}>
              <CommentIcon />
            </IconButton>
          </Box>
        )}
        {!isUser && (
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleLike}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton onClick={handleUnlike}>
              <ThumbDownIcon />
            </IconButton>
            <Typography>{like_count} likes</Typography>
            <IconButton onClick={toggleComments}>
              <CommentIcon />
            </IconButton>
          </Box>
        )}
      </Card>
      <Collapse in={commentsVisible} timeout="auto" unmountOnExit>
        <PostComment userName={userName} id={id} userAvatar={userAvatar} />
      </Collapse>
    </div>
  );
};
export default Post;
