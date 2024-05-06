import React, { useState } from "react";
import UserListPage from "./listUser";
import { Grid } from "@mui/material";
import UserPostsPage from "./userPostPage";
import UserAlbumPage from "./userAlbumPage";


function CardList() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleUserSelected = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Grid
      container
      gap={4}
      flexWrap={{ lg: "nowrap" }}
      justifyContent={"center"}
    >
      <Grid md={3}>
        <UserListPage
          onUserSelected={handleUserSelected}
          bgTopColor={"var(--facebook)"}
        />
      </Grid>
      <Grid md={8}>
        {selectedUserId && <UserPostsPage userId={selectedUserId} />}
        {selectedUserId && <UserAlbumPage userId={selectedUserId} />}

      </Grid>
    </Grid>
  );
}

export default CardList;
