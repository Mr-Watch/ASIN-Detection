import { useEffect, useRef, useState } from "react";
import Input from "./Input.jsx";

export default function Asin({ visibility, parentFunction, customMessage }) {
  function validateASIN(asin) {
    return /^[A-Z|0-9]{10}$/gm.test(asin);
  }

  function handleChild(message, data) {
    if (message === "valid") parentFunction(message, data);
  }

  return (
    <>
      <Input
        text="OR Try to find manually the<br />ASIN"
        message="This ASIN is invalid"
        validateFunction={validateASIN}
        style={{ visibility: visibility }}
        parentFunction={handleChild}
        customMessage={customMessage}
      />
    </>
  );
}
