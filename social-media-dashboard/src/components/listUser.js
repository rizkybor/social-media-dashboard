// UserListPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, List, ListItem, ListItemText, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";

function UserListPage({ onUserSelected }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    onUserSelected(userId);
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
      <CardActionArea>
        <CardMedia
          sx={{ background: blue, border: "none", minHeight: "5px" }}
          height="5"
          className="card-top"
        />
        <div>
          <Typography variant="h4" gutterBottom>
            User List
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                button
                onClick={() => handleUserClick(user.id)} // Panggil handleUserClick saat pengguna mengklik
              >
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default UserListPage;
