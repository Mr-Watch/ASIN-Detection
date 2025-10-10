import { styled } from "@mui/material/styles";

export default function Header({ src }) {
  const Img = styled("img")({
    position: "relative",
    height: "inherit",
    left: "2%",
  });

  return (
    <>
      <header style={{ width: "100%", height: "100px" }}>
        <Img src={src} alt="Header image" />
      </header>
    </>
  );
}
