import Header from "./components/header";
import CardList from "./components/cardlist";
import { Grid } from "@mui/material";

import "./style/style.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Grid sx={{ maxWidth: "1400px", margin: "50px auto" }}>
        <section>
          <CardList></CardList>
        </section>
      </Grid>
    </div>
  );
}

export default App;
