import CircularProgress from "@mui/material/CircularProgress";
import ProductUrl from "./components/ProductUrl.jsx";
import Container from "@mui/material/Container";
import Product from "./components/Product.jsx";
import Header from "./components/Header.jsx";
import Info from "./components/Info.jsx";
import Asin from "./components/Asin.jsx";
import Form from "./components/Form.jsx";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import {
  getCorrectHtmlString,
  getProductImageURL,
  getProductTitle,
  getProductWayFinding,
} from "./utilities/product-info-extractor.js";

function App() {
  const [spinnerVisibility, setSpinnerVisibility] = useState("hidden");
  const [asinVisibility, setAsinVisibility] = useState("hidden");
  const [formDisabled, setFormDisabled] = useState(true);
  const [customMessages, setCustomMessages] = useState({
    productUrl: undefined,
    asin: undefined,
  });
  const [errorVisibilities, setErrorVisibilities] = useState({
    productUrl: "hidden",
    asin: "hidden",
  });
  const [productData, setProductData] = useState({
    justify: "center",
    display: "none",
    title: "",
    src: null,
  });
  const [seeHowDialogData, setSeeHowDialogData] = useState({
    visibility: "hidden",
    title: "",
    body: "",
  });

  function genericSet(_function, key, value) {
    _function((prevData) => ({ ...prevData, [key]: value }));
  }

  async function setupProduct(url, messenger) {
    setSpinnerVisibility("visible");

    try {
      let htmlString = await getCorrectHtmlString(url);

      setProductData((prevData) => ({
        ...prevData,
        title: getProductTitle(htmlString),
        src: getProductImageURL(htmlString),
        display: "flex",
      }));
      setSeeHowDialogData((prevData) => ({
        ...prevData,
        title: "We will show you how",
        body:
          "You can find it by following the sections listed bellow on amazon<br />" +
          getProductWayFinding(htmlString),
      }));

      if (messenger === "asin") {
        genericSet(setSeeHowDialogData, "visibility", "visible");
        genericSet(setProductData, "justify", "end");
      }
      setSpinnerVisibility("hidden");
      setFormDisabled(false);
    } catch (error) {
      if (messenger === "asin") {
        genericSet(
          setCustomMessages,
          "asin",
          "Sorry we didn't find product information with this ASIN."
        );
        genericSet(setErrorVisibilities, "asin", "visible");
      } else {
        genericSet(
          setCustomMessages,
          "productUrl",
          "Sorry we didn't find product information at this URL."
        );
        genericSet(setErrorVisibilities, "productUrl", "visible");
        setAsinVisibility("visible");
      }
      setSpinnerVisibility("hidden");
      return;
    }
  }

  function clearProduct() {
    setProductData((prevData) => ({
      ...prevData,
      title: "",
      src: null,
      display: "none",
    }));
    setFormDisabled(true);
  }

  function handleChangeProductUrl(message, data) {
    clearProduct();

    if (message === "invalid") {
      genericSet(setErrorVisibilities, "productUrl", "hidden");
      genericSet(setCustomMessages, "productUrl", undefined);
      setAsinVisibility("hidden");
      genericSet(setSeeHowDialogData, "visibility", "hidden");
      genericSet(setErrorVisibilities, "asin", "hidden");
    } else {
      setupProduct(data, "product");
    }
  }

  function handleChangeAsin(message, data) {
    clearProduct();
    genericSet(setSeeHowDialogData, "visibility", "hidden");

    if (message === "invalid") {
      genericSet(setErrorVisibilities, "asin", "hidden");
      genericSet(setCustomMessages, "asin", undefined);
    } else {
      setupProduct(data, "asin");
    }
  }

  return (
    <>
      <Header src="/assets/YOM.png" />
      <Container maxWidth="md">
        <h1 id="step">2nd Step</h1>
        <h2 id="hero-text">
          Go to Amazon.com and search the word <span id="key">sleep aid</span> &
          pick the product that is most appealing to you.
        </h2>
        <Info
          text="As this is for market research, please do not select our brand."
          backgroundColor="#f3ebd8"
          iconColor="#fece33"
        />
      </Container>
      <Container sx={{ height: "30px" }}>
        <CircularProgress
          color="black"
          size="40px"
          sx={{
            visibility: spinnerVisibility,
            float: "right",
          }}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "100% !important",
        }}
      >
        <Stack direction="row" spacing={2}>
          <ProductUrl
            errorVisibility={errorVisibilities.productUrl}
            customMessage={customMessages.productUrl}
            parentFunction={handleChangeProductUrl}
          />
          <Asin
            errorVisibility={errorVisibilities.asin}
            customMessage={customMessages.asin}
            parentFunction={handleChangeAsin}
            seeHowData={seeHowDialogData}
            visibility={asinVisibility}
          />
        </Stack>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: productData.justify,
          marginTop: "50px",
          marginBottom: "70px",
        }}
      >
        <Product
          display={productData.display}
          title={productData.title}
          src={productData.src}
        />
      </Container>
      <Form formDisabled={formDisabled} />
    </>
  );
}

export default App;
