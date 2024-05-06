import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

function UserAlbumsPage({ userId }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserAlbums() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchUserAlbums();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>User's Albums</Typography>
      <Grid container spacing={2}>
        {albums.map(album => (
          <Grid item key={album.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/150/92c952/${album.id}`}
                alt={album.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {album.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {album.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserAlbumsPage;
