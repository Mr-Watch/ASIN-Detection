import { useEffect, useRef, useState } from "react";
import Input from "./Input.jsx";

export default function Asin({ visibility }) {
  function validateASIN(asin) {
    return /^[A-Z|0-9]{10}$/gm.test(asin);
  }

  return (
    <>
      <Input
        text="OR Try to find manually the<br />ASIN"
        message="This ASIN is invalid"
        validateFunction={validateASIN}
        style={{ visibility: visibility }}
      />
    </>
  );
}
