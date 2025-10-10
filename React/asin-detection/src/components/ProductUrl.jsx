import Input from "./Input.jsx";

export default function ProductUrl({
  errorVisibility,
  parentFunction,
  customMessage,
}) {
  function validateURL(url) {
    return /^https?:\/\/www\.amazon\.com\/(?:[a-zA-Z0-9-%\s.]*\/)?dp\/[A-Z0-9]{10}(?:[\/?].*)?$/gm.test(
      url
    );
  }

  function handleChild(message, data) {
    parentFunction(message, data);
  }

  return (
    <>
      <Input
        text="Paste here the URL of the product that you choose!"
        message="This url is not valid"
        validationFunction={validateURL}
        parentFunction={handleChild}
        customMessage={customMessage}
        errorVisibility={errorVisibility}
      />
    </>
  );
}
