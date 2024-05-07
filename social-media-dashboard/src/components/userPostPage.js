import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import CommentList from "./commentList";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UserPostsPage({ userId, userName }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [editedPost, setEditedPost] = useState({});

  const handleAddEditDialog = (post = {}) => {
    setEditedPost({ ...post, userId });
    setOpenAddEditDialog(true);
  };

  const handleSavePost = () => {
    try {
      if (editedPost.id) {
        const updatedPosts = posts.map((post) =>
          post.id === editedPost.id ? editedPost : post
        );
        setPosts(updatedPosts);
      } else {
        const newPost = { ...editedPost, id: Date.now() }; 
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
      }
      setOpenAddEditDialog(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleEditPost = (post) => {
    setEditedPost(post);
    setOpenAddEditDialog(true);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [userId, userName]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card
      sx={{
        minWidth: 270,
        bgcolor: "var(--card-bg)",
        boxShadow: "none",
      }}
    >
      <Button sx={{ padding: "20px" }} onClick={() => handleAddEditDialog()}>
        Add Post
      </Button>

      <Dialog
        open={openAddEditDialog}
        onClose={() => setOpenAddEditDialog(false)}
      >
        <DialogTitle>{editedPost.id ? "Edit Post" : "Add Post"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editedPost.title || ""}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Body"
            value={editedPost.body || ""}
            onChange={(e) =>
              setEditedPost({ ...editedPost, body: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSavePost}>
            {editedPost.id ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <Typography
          sx={{ padding: "20px" }}
          variant="h4"
          gutterBottom
        >
          Posts by {userName}
        </Typography>
        <List>
          {posts.map((post) => (
            <ListItem key={post.id} button>
              <div onClick={() => handlePostClick(post)}>
                <ListItemText
                  primary={post.title}
                  secondary={post.body}
                />
              </div>
              <Button onClick={() => handleEditPost(post)}>
                <EditIcon />
              </Button>
              <Button onClick={() => handleDeletePost(post.id)}>
                <DeleteIcon />
              </Button>
            </ListItem>
          ))}
        </List>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedPost && selectedPost.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {selectedPost && selectedPost.body}
            </Typography>
            {selectedPost && <CommentList postId={selectedPost.id} />}
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}

export default UserPostsPage;
