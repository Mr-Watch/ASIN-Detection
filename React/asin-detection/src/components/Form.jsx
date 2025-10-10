import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function Form({ formDisabled }) {
  const Img = styled("img")({
    height: "50px",
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
          paddingTop: "30px",
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
            placeholder="It was by far the most well rated"
            disabled={formDisabled}
          ></textarea>
          <textarea
            name="product details attention"
            placeholder="It is very descriptive"
            disabled={formDisabled}
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
          sx={{
            maxWidth: "500px",
            margin: "50px",
            marginTop: "150px",
            backgroundColor: "#f6c506",
            color: "black",
            fontWeight: "bold",
          }}
          fullWidth
          disabled={formDisabled}
          onClick={handleSubmit}
        >
          NEXT
        </Button>
      </Container>
    </>
  );
}
