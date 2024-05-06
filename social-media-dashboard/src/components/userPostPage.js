import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CommentList from './commentList';

function UserPostsPage({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // State untuk menyimpan post yang dipilih
  const [openDialog, setOpenDialog] = useState(false); // State untuk mengontrol dialog

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [userId]);

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set post yang dipilih saat diklik
    setOpenDialog(true); // Buka dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Tutup dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>User's Posts</Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post.id} button onClick={() => handlePostClick(post)}>
            <ListItemText
              primary={post.title}
              secondary={post.body}
            />
          </ListItem>
        ))}
      </List>

      {/* Dialog untuk menampilkan detail post */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedPost && selectedPost.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedPost && selectedPost.body}</Typography>
          {/* Menampilkan daftar komentar di dalam dialog */}
          {selectedPost && <CommentList postId={selectedPost.id} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserPostsPage;
