import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import Stack from "@mui/material/Stack";
import ErrorIcon from "@mui/icons-material/Error";

export default function ProductUrl() {
  return (
    <>
      <Container maxWidth="sm">
        <h2>Paste here the URL of the product that you choose!</h2>
        <input
          style={{ width: "100%" }}
          type="text"
          name="Paste product url"
          aria-label="Paste product url"
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            paddingTop: 4,
            alignItems: "center",
            maxWidth: 700,
          }}
        >
          <ErrorIcon sx={{ fontSize: 50, color: "#fa0101" }} />
          <h2 style={{ color: "#fa0101" }}>Message</h2>
        </Stack>
      </Container>
    </>
  );
}
