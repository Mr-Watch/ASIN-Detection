import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import Stack from "@mui/material/Stack";
import ErrorIcon from "@mui/icons-material/Error";
import { useEffect, useRef, useState } from "react";

export default function Input({
  text,
  message,
  notifyParent,
  validateFunction,
}) {
  const [value, setValue] = useState("");
  const [_message, setMessage] = useState("");
  const [visibility, setVisibility] = useState("visible");
  const inputRef = useRef(null);

  function handleValue(e) {
    setValue(e.target.value);
  }

  function validateInput() {
    let validity = validateFunction(inputRef.current.value);
    if (inputRef.current.value === "") {
      inputRef.current.setCustomValidity("");
      setVisibility("hidden");
    } else if (validity) {
      inputRef.current.setCustomValidity("");
      setVisibility("hidden");
    } else {
      setMessage(message);
      setVisibility("visible");
      inputRef.current.setCustomValidity(message);
    }
  }

  useEffect(validateInput, [value]);

  return (
    <>
      <Container maxWidth="sm">
        <h2 dangerouslySetInnerHTML={{ __html: text }}></h2>
        <input
          ref={inputRef}
          style={{ width: "100%" }}
          type="text"
          name={text}
          aria-label={text}
          value={value}
          onChange={handleValue}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            paddingTop: 4,
            alignItems: "center",
            visibility: { visibility },
          }}
        >
          <ErrorIcon sx={{ fontSize: 50, color: "#fa0101" }} />
          <h2 style={{ color: "#fa0101" }}>{_message}</h2>
        </Stack>
      </Container>
    </>
  );
}
