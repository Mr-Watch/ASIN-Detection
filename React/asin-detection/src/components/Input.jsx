import { useEffect, useRef, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export default function Input({
  validationFunction,
  componentVisibility,
  errorVisibility,
  parentFunction,
  customMessage,
  message,
  text,
}) {
  const [internalInputValue, setInternalInputValue] = useState("");
  const [internalMessage, setInternalMessage] = useState("");
  const [internalErrorVisibility, setInternalErrorVisibility] =
    useState("hidden");
  const inputRef = useRef(null);

  function handleInternalInputValue(event) {
    setInternalInputValue(event.target.value);
  }

  function validateInput() {
    let validity = validationFunction(inputRef.current.value);
    if (inputRef.current.value === "") {
      inputRef.current.setCustomValidity("");
      setInternalMessage(message);
      setInternalErrorVisibility("hidden");
      parentFunction("invalid", internalInputValue);
    } else if (validity) {
      inputRef.current.setCustomValidity("");
      setInternalErrorVisibility("hidden");
      parentFunction("valid", internalInputValue);
    } else {
      setInternalMessage(message);
      setInternalErrorVisibility("visible");
      inputRef.current.setCustomValidity(message);
      parentFunction("invalid");
    }
  }

  useEffect(validateInput, [internalInputValue]);

  return (
    <>
      <Container
        sx={{ maxWidth: "550px !important", visibility: componentVisibility }}
      >
        <h2>{text}</h2>
        <input
          ref={inputRef}
          style={{ width: "90%" }}
          type="text"
          name={text}
          aria-label={text}
          value={internalInputValue}
          onChange={handleInternalInputValue}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            paddingTop: "20px",
            alignItems: "center",
            visibility: {
              visibility:
                errorVisibility === "visible"
                  ? errorVisibility
                  : internalErrorVisibility,
            },
          }}
        >
          <ErrorIcon sx={{ fontSize: "50px", color: "#fa0101" }} />
          <p style={{ color: "#fa0101" }}>
            {customMessage !== undefined ? customMessage : internalMessage}
          </p>
        </Stack>
      </Container>
    </>
  );
}
