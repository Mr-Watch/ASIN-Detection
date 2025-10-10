import { useEffect, useRef, useState } from "react";
import Input from "./Input.jsx";
import SeeHowDialog from "./SeeHowDialog.jsx";
import Stack from "@mui/material/Stack";

export default function Asin({
  visibility,
  parentFunction,
  customMessage,
  errorVisibility,
  seeHowData,
}) {
  function validateASIN(asin) {
    return /^[A-Z|0-9]{10}$/gm.test(asin);
  }

  function handleChild(message, data) {
    if (message === "valid") {
      parentFunction(message, data);
    } else if (message === "invalid") {
      parentFunction("invalid", data);
    }
  }
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          text="OR Try to find manually the<br />ASIN"
          message="This ASIN is invalid"
          validateFunction={validateASIN}
          componentVisibility={visibility}
          parentFunction={handleChild}
          customMessage={customMessage}
          errorVisibility={errorVisibility}
        />
        <SeeHowDialog
          title={seeHowData.title}
          body={seeHowData.body}
          visibility={seeHowData.visibility}
        />
      </Stack>
    </>
  );
}
