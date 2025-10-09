import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Form({ formLocked }) {
  return (
    <>
      <Container>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={4}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid size={4}>
            <h3>What made you pick this product from the search results?</h3>
          </Grid>
          <Grid size={6}>
            <Container maxWidth="sm">
              <h3>
                Looking to the product detail page,
                <br />
                what grabs your attention the most?
                <br />
                What do you like about this product?
              </h3>
            </Container>
          </Grid>
          <Grid size={4}>
            <textarea
              name="product from search"
              id="product-from-search"
              placeholder="It was by far the most well rated"
              disabled={formLocked}
            ></textarea>
          </Grid>
          <Grid size={6}>
            <textarea
              name="product details attention"
              id="product-details-attention"
              placeholder="It is very descriptive"
              disabled={formLocked}
            ></textarea>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <Button
          variant="contained"
          sx={{ bgcolor: "#f6c506", color: "black", fontWeight: "bold" }}
          fullWidth
          disabled={formLocked}
        >
          NEXT
        </Button>
      </Container>
    </>
  );
}
