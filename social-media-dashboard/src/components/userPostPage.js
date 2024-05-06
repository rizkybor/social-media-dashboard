import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import Card from "@mui/material/Card";


function UserPostsPage({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <Typography variant="h4" gutterBottom>User's Posts</Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post.id}>
            <ListItemText
              primary={post.title}
              secondary={post.body}
            />
          </ListItem>
        ))}
      </List>
    </div>
    </Card>
  );
}

export default UserPostsPage;
