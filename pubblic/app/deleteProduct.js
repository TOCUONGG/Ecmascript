import "regenerator-runtime/runtime";
import FirebbaseConstants from "./constants/FirebbaseConstants";
import UrlHelper from "./helpers/UrlHelper";

import Product from "./models/Product";
import ProductService from "./services/ProductService";

$(document).ready(function () {
  const productService = new ProductService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");

  productService.deleteProduct(id).then((data) => {
    location.href = "listProducts.html";
  });
});
