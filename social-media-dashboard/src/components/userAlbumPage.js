import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
} from "@mui/material";

function UserAlbumsPage({ userId, userName }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    async function fetchUserAlbums() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/albums`
        );
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchUserAlbums();
  }, [userId]);

  const handleAlbumClick = async (album) => {
    setSelectedAlbum(album);
    setOpenDialog(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAlbum(null);
    setPhotos([]);
  };

  const handleOpenPhotoDialog = (photo) => {
    setSelectedPhoto(photo);
    setOpenPhotoDialog(true);
  };

  const handleClosePhotoDialog = () => {
    setOpenPhotoDialog(false);
    setSelectedPhoto(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Card
        sx={{
          minWidth: 270,
          bgcolor: "var(--card-bg)",
          boxShadow: "none",
          padding: "20px",
        }}
      >
        <Typography sx={{ padding: "20px" }} variant="h4" gutterBottom>
          Albums by {userName}
        </Typography>
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item key={album.id} xs={12} sm={6} md={4} lg={3}>
              <Card onClick={() => handleAlbumClick(album)}>
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
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="h5">
            {selectedAlbum && selectedAlbum.title}
          </Typography>
          <Grid container spacing={2}>
            {photos.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
                <Card onClick={() => handleOpenPhotoDialog(photo)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                  <CardContent>
                    <Typography variant="body2">{photo.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog open={openPhotoDialog} onClose={handleClosePhotoDialog}>
        <DialogContent>
          {selectedPhoto && (
            <Card>
              <CardMedia
                component="img"
                height="auto"
                image={selectedPhoto.url}
                alt={selectedPhoto.title}
              />
              <CardContent>
                <Typography variant="h5">{selectedPhoto.title}</Typography>
                <Typography variant="body2">
                  {selectedPhoto.description}
                </Typography>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserAlbumsPage;
