import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Product({ title, src, display }) {
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
          display: { display },
        }}
      >
        <Img src={src} alt="Product image" />
        <CheckCircleIcon
          sx={{ fontSize: 50, color: "#16bb2c", marginLeft: "40px !important" }}
        />
        <Container
          sx={{
            margin: "0px !important",
            padding: "0px !important",
            marginLeft: "15px !important",
          }}
        >
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
