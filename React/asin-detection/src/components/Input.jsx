import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ErrorIcon from "@mui/icons-material/Error";
import { useEffect, useRef, useState } from "react";

export default function Input({
  text,
  message,
  validateFunction,
  parentFunction,
  customMessage,
  componentVisibility,
  errorVisibility,
}) {
  const [value, setValue] = useState("");
  const [_message, setMessage] = useState("");
  const [_errorVisibility, setVisibility] = useState("visible");
  const inputRef = useRef(null);

  function handleValue(e) {
    setValue(e.target.value);
  }

  function validateInput() {
    let validity = validateFunction(inputRef.current.value);
    if (inputRef.current.value === "") {
      inputRef.current.setCustomValidity("");
      setMessage(message);
      setVisibility("hidden");
      parentFunction("invalid", value);
    } else if (validity) {
      inputRef.current.setCustomValidity("");
      setVisibility("hidden");
      parentFunction("valid", value);
    } else {
      setMessage(message);
      setVisibility("visible");
      inputRef.current.setCustomValidity(message);
      parentFunction("invalid");
    }
  }

  useEffect(validateInput, [value]);

  return (
    <>
      <Container
        sx={{ maxWidth: "550px !important", visibility: componentVisibility }}
      >
        <h2 dangerouslySetInnerHTML={{ __html: text }}></h2>
        <input
          ref={inputRef}
          style={{ width: "90%" }}
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
            visibility: {
              visibility:
                errorVisibility === "visible"
                  ? errorVisibility
                  : _errorVisibility,
            },
          }}
        >
          <ErrorIcon sx={{ fontSize: 50, color: "#fa0101" }} />
          <p style={{ color: "#fa0101" }}>
            {customMessage !== undefined ? customMessage : _message}
          </p>
        </Stack>
      </Container>
    </>
  );
}
