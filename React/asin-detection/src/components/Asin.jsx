import SeeHowDialog from "./SeeHowDialog.jsx";
import Stack from "@mui/material/Stack";
import Input from "./Input.jsx";

export default function Asin({
  errorVisibility,
  parentFunction,
  customMessage,
  visibility,
  seeHowData,
}) {
  function validateASIN(asin) {
    return /^[A-Z|0-9]{10}$/gm.test(asin);
  }

  function handleChild(message, data) {
    parentFunction(message, data);
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
          text={
            <>
              OR Try to find manually the
              <br />
              ASIN
            </>
          }
          message="This ASIN is invalid"
          validationFunction={validateASIN}
          parentFunction={handleChild}
          customMessage={customMessage}
          errorVisibility={errorVisibility}
          componentVisibility={visibility}
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
