import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Form() {
  return (
    <>
      <Container>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <h3>What made you pick this product from the search results?</h3>
            <textarea
              name="product from search"
              id="product-from-search"
              placeholder="It was by far the most well rated"
              disabled
            ></textarea>
          </Container>
          <Container maxWidth="sm">
            <h3>
              Looking to the product detail page,
              <br />
              what grabs your attention the most?
              <br />
              What do you like about this product?
            </h3>
            <textarea
              name="product details attention"
              id="product-details-attention"
              placeholder="It is very descriptive"
              disabled
            ></textarea>
          </Container>
        </Stack>
      </Container>
      <Container maxWidth="sm">
        <Button
          variant="contained"
          sx={{ bgcolor: "#f6c506", color: "black", fontWeight: "bold" }}
          fullWidth
        >
          NEXT
        </Button>
      </Container>
    </>
  );
}
