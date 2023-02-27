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
  const productIdCtrl = $("#productId");
  const nameCtrl = $("#name");
  const priceCtrl = $("#price");
  const quantityCtrl = $("#quantity");
  const descriptionCtrl = $("#description");

  productService.findById(id).then((data) => {
    const { name, quantity, price, description } = data;
    productIdCtrl.val(id);
    nameCtrl.val(name);
    quantityCtrl.val(quantity);
    priceCtrl.val(price);
    descriptionCtrl.val(description);
  });

  $("#update").on("click", () => {
    const product = new Product(
      null,
      nameCtrl.val(),
      priceCtrl.val(),
      quantityCtrl.val(),
      descriptionCtrl.val()
    );

    try {
      productService
        .updateProduct(productIdCtrl.val(), product)
        .then((data) => {
          location.href = "listProducts.html";
        });
    } catch (error) {
      console.log(error);
    }

    // console.log(cate);
    console.log("save click");
  });
});
