import { useState } from "react";
import Header from "./components/Header.jsx";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import ProductUrl from "./components/ProductUrl.jsx";
import Asin from "./components/Asin.jsx";
import Product from "./components/Product.jsx";
import Form from "./components/Form.jsx";
import Info from "./components/Info.jsx";

import {
  getCorrectHtmlString,
  getProductImageURL,
  getProductTitle,
  getProductWayFinding,
} from "./utilities/product-info-extractor.js";

function App() {
  const [formLocked, setFormLocked] = useState(true);
  const [spinnerVisibility, setSpinnerVisibility] = useState("hidden");
  const [customMessages, setCustomMessages] = useState({
    productUrl: undefined,
    asin: undefined,
  });

  const [asinVisibility, setAsinVisibility] = useState("hidden");

  const [errorVisibilities, setErrorVisibilities] = useState({
    productUrl: "hidden",
    asin: "hidden",
  });

  const [productData, setProductData] = useState({
    title: "test",
    src: "test",
    display: "none",
    justify: "center",
  });

  const [seeHowDialogData, setSeeHowDialogData] = useState({
    title: "",
    body: "",
    visibility: "hidden",
  });

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
        setSeeHowDialogData((prevData) => ({
          ...prevData,
          visibility: "visible",
        }));
        setProductData((prevData) => ({
          ...prevData,
          justify: "end",
        }));
      }

      setSpinnerVisibility("hidden");
      setFormLocked(false);
    } catch (error) {
      console.log(error);
      if (messenger === "asin") {
        setCustomMessages((prevData) => ({
          ...prevData,
          asin: "Sorry we didn't find product information with this ASIN.",
        }));
        setErrorVisibilities((prevData) => ({
          ...prevData,
          asin: "visible",
        }));
      } else {
        setCustomMessages((prevData) => ({
          ...prevData,
          productUrl: "Sorry we didn't find product information at this URL.",
        }));

        setErrorVisibilities((prevData) => ({
          ...prevData,
          productUrl: "visible",
        }));
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
    setFormLocked(true);
  }

  function handleChangeProductUrl(message, data) {
    clearProduct();

    if (message === "invalid") {
      setErrorVisibilities((prevData) => ({
        ...prevData,
        productUrl: "hidden",
      }));
      setCustomMessages((prevData) => ({
        ...prevData,
        productUrl: undefined,
      }));
      setAsinVisibility("hidden");
      setSeeHowDialogData((prevData) => ({
        ...prevData,
        visibility: "hidden",
      }));
      setErrorVisibilities((prevData) => ({
        ...prevData,
        asin: "hidden",
      }));
    } else {
      setupProduct(data, "product");
    }
  }

  function handleChangeAsin(message, data) {
    clearProduct();

    setSeeHowDialogData((prevData) => ({
      ...prevData,
      visibility: "hidden",
    }));

    if (message === "invalid") {
      setErrorVisibilities((prevData) => ({
        ...prevData,
        asin: "hidden",
      }));
      setCustomMessages((prevData) => ({
        ...prevData,
        asin: undefined,
      }));
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
        <Stack
          direction="row"
          spacing={2}
          // sx={{
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <ProductUrl
            parentFunction={handleChangeProductUrl}
            customMessage={customMessages.productUrl}
            errorVisibility={errorVisibilities.productUrl}
          />
          <Asin
            visibility={asinVisibility}
            parentFunction={handleChangeAsin}
            customMessage={customMessages.asin}
            errorVisibility={errorVisibilities.asin}
            seeHowData={seeHowDialogData}
          />
        </Stack>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: productData.justify,
          top: "0px",
          position: "relative",
          marginTop: "50px",
          marginBottom: "60px",
        }}
      >
        <Product
          title={productData.title}
          src={productData.src}
          display={productData.display}
        />
      </Container>
      <Form formLocked={formLocked} />
    </>
  );
}

export default App;
