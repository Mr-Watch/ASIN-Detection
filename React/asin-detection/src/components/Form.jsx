import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export default function Form({ formLocked }) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxHeight: "50px",
    marginBottom: "20px",
  });

  function handleSubmit() {
    alert("What is next... Who knows?");
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img src="./assets/arrow.svg" alt="dropdown arrow" />
      </Container>
      <Container
        sx={{
          maxWidth: "100% !important",
          backgroundColor: "#ffffff",
          borderTop: "solid 3px #e0e1e1",
        }}
      >
        <div id="textarea-container">
          <h3>What made you pick this product from the search results?</h3>
          <h3>
            Looking to the product detail page,
            <br />
            what grabs your attention the most?
            <br />
            What do you like about this product?
          </h3>

          <textarea
            name="product from search"
            id="product-from-search"
            placeholder="It was by far the most well rated"
            disabled={formLocked}
          ></textarea>
          <textarea
            name="product details attention"
            id="product-details-attention"
            placeholder="It is very descriptive"
            disabled={formLocked}
          ></textarea>
        </div>
      </Container>
      <Container
        sx={{
          maxWidth: "100% !important",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            maxWidth: "500px",
            margin: "50px",
            marginTop: "150px",
            bgcolor: "#f6c506",
            color: "black",
            fontWeight: "bold",
          }}
          fullWidth
          disabled={formLocked}
          onClick={handleSubmit}
        >
          NEXT
        </Button>
      </Container>
    </>
  );
}
