import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";

export default function info({ text, iconColor, backgroundColor }) {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          backgroundColor: backgroundColor,
          borderRadius: "100px",
          padding: "10px",
          marginBottom: "40px",
        }}
      >
        <InfoIcon sx={{ fontSize: 48, color: iconColor }} />
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </Stack>
    </>
  );
}
