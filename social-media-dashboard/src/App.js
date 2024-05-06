import Header from "./components/header";
import CardList from "./components/cardlist";
import CardList2 from "./components/cardlist2";
import { Grid, Typography } from "@mui/material";

import "./style/style.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Grid sx={{ maxWidth: "1400px", margin: "50px auto" }}>
        <section>
          <CardList></CardList>
        </section>
        <section>
          <CardList2></CardList2>
        </section>
      </Grid>
    </div>
  );
}

export default App;
