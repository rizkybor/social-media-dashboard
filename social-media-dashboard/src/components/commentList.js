import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedComment, setEditedComment] = useState({}); 
  const [editCommentIndex, setEditCommentIndex] = useState(-1);
  const [newComment, setNewComment] = useState({
    name: "",
    body: "",
  });

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        newComment
      );
      setComments([...comments, response.data]);
      setNewComment({
        name: "",
        body: "",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setEditedComment({ ...comments[index] });
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments/${editedComment.id}`,
        editedComment
      );
      const updatedComments = [...comments];
      updatedComments[editCommentIndex] = editedComment;
      setComments(updatedComments);
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments/${comments[index].id}`
      );
      const updatedComments = comments.filter((comment, i) => i !== index);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <hr />
      <br />
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment.name} secondary={comment.body} />
            <Button onClick={() => handleEditComment(index)}>Edit</Button>
            <Button onClick={() => handleDeleteComment(index)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={editedComment.name || ""}
            onChange={(e) =>
              setEditedComment({ ...editedComment, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Body"
            value={editedComment.body || ""}
            onChange={(e) =>
              setEditedComment({ ...editedComment, body: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
      <TextField
        fullWidth
        label="Name"
        value={newComment.name}
        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Body"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={handleAddComment}>Add Comment</Button>
    </div>
  );
}

export default CommentList;
