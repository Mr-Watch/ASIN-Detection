import { useState } from "react";
import Header from "./components/Header.jsx";
import Container from "@mui/material/Container";
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
  const [productData, setProductData] = useState({
    title: "",
    src: "",
    display: "none",
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
      // dialogNode.setBody(
      //   "You can find it by following the sections listed bellow on amazon<br>" +
      //     getProductWayFinding(htmlString)
      // );

      // if (messenger === "asin-component") {
      //   asinNode.showSeeHow();
      // }

      setSpinnerVisibility("hidden");
      setFormLocked(false);
    } catch (error) {
      console.log(error);
      if (messenger === "asin") {
        setCustomMessages((prevData) => ({
          ...prevData,
          asin: "Sorry we didn't find product information with this ASIN.",
        }));
      } else {
        setCustomMessages((prevData) => ({
          ...prevData,
          productUrl: "Sorry we didn't find product information at this URL.",
        }));

        // asinNode.show();
      }

      setSpinnerVisibility("hidden");
      return;
    }
  }

  function handleChangeProductUrl(message, data) {
    setupProduct(data, "product");
  }

  function handleChangeAsin(message, data) {
    setupProduct(data, "asin");
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
        <CircularProgress
          color="black"
          size="40px"
          sx={{ visibility: spinnerVisibility }}
        />
      </Container>
      <ProductUrl
        parentFunction={handleChangeProductUrl}
        customMessage={customMessages.productUrl}
      />
      <Asin visibility="hidden" parentFunction={handleChangeAsin} customMessage={customMessages.asin} />
      <Product
        title={productData.title}
        src={productData.src}
        display={productData.display}
      />
      <Form formLocked={formLocked} />
    </>
  );
}

export default App;
