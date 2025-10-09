import { useState } from "react";
import Header from "./components/Header.jsx";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import ProductUrl from "./components/ProductUrl.jsx";
import Asin from "./components/Asin.jsx";
import Product from "./components/Product.jsx";
import Form from "./components/Form.jsx";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";
import Info from "./components/Info.jsx";
function App() {
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
        <CircularProgress color="black" size="40px" />
      </Container>
      <ProductUrl />
      <Asin />
      <Product title="This is the best" src="/assets/YOM.png" />
      <Form />
    </>
  );
}

export default App;
