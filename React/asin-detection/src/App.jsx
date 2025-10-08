import { useState } from "react";
import Header from "./components/Header.jsx";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import Form from "./components/Form.jsx";

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
        <CircularProgress color="black" size={40} />
      </Container>
    <Form />
    </>
  );
}

export default App;
