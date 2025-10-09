import { useState } from "react";
import Header from "./components/Header.jsx";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import ProductUrl from "./components/ProductUrl.jsx";
import Asin from "./components/Asin.jsx";
import Product from "./components/Product.jsx";
import Form from "./components/Form.jsx";
import Info from "./components/Info.jsx";

function App() {
  const [locked, setLocked] = useState(true);
  const [spinnerVisibility, setSpinnerVisibility] = useState("visible");
  const [productDisplay, setProductDisplay] = useState("flex");

  function handleChange(e) {
    setText(e.target.value);
  }

  function notifyParent(intent) {
    if (intent === "yes")
      console.log(
        "YEYYYYYYYYYYYYYYYYYYYYYYYYEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSS"
      );
  }

  return (
    <>
      <Header src="/assets/YOM.png" />
      <Container maxWidth="md">
        <h1 id="step">2nd Step</h1>
        <h2 id="hero-text">
          Go to Amazon.com and search the word <span id="key">sleep aid</span> &
          pick the product that is most appealing to you.
        </h2>
        <Info
          text="As this is for market research, please do not select our brand."
          backgroundColor="#f3ebd8"
          iconColor="#fece33"
        />
        <CircularProgress
          color="black"
          size="40px"
          sx={{ visibility: spinnerVisibility }}
        />
      </Container>
      <ProductUrl />
      <Asin visibility="hidden" />
      <Product
        title="This is the best"
        src="/assets/YOM.png"
        display={productDisplay}
      />
      <Form locked={locked} />
    </>
  );
}

export default App;
