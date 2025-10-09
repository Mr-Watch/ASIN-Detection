import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Product({ title, src, display, direction }) {
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
        maxWidth="md"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { display },
        }}
      >
        <Img src={src} alt="Product image" />
        <CheckCircleIcon sx={{ fontSize: 50, color: "#16bb2c" }} />
        <Container>
          <p
            style={{
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </p>
          <h3 style={{ color: "#16bb2c" }}>This is a valid product</h3>
        </Container>
      </Stack>
    </>
  );
}
