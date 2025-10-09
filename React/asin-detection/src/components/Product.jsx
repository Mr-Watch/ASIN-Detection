import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Product({ title, src, visibility, direction }) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "250px",
    maxHeight: "250px",
  });

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img src={src} alt="Product image" />
        <CheckCircleIcon sx={{ fontSize: 50, color: "#16bb2c" }} />
        <Container >
          <p>{title}</p>
          <h3 style={{ color: "#16bb2c" }}>This is a valid product</h3>
        </Container>
      </Stack>
    </>
  );
}
