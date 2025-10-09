import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import Stack from "@mui/material/Stack";
import ErrorIcon from "@mui/icons-material/Error";
import Input from "./Input.jsx";

export default function ProductUrl({ text, onChange }) {
  function validateURL(url) {
    return /^https?:\/\/www\.amazon\.com\/(?:[a-zA-Z0-9-%\s.]*\/)?dp\/[A-Z0-9]{10}(?:[\/?].*)?$/gm.test(
      url
    );
  }

  return (
    <>
      <Input
        text="Paste here the URL of the product that you choose!"
        message="This url is not valid"
        validateFunction={validateURL}
      />
    </>
  );
}
