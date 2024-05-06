import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
        <hr/>
        <br/>
      <Typography variant="h6" gutterBottom>Comments</Typography>
      <List>
        {comments.map(comment => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={comment.name}
              secondary={comment.body}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CommentList;
