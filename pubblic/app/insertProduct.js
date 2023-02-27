import "regenerator-runtime/runtime";

import Product from "./models/Product";
import CategoryService from "./services/CategoryService";
import ProductService from "./services/ProductService";
import FirebbaseConstants from "./constants/FirebbaseConstants";

$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  const productService = new ProductService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  const categoryIdCtrl = $("#categoryId");
  categoryService.findAllCategory().then((data) => {
    let list = "";
    for (const key in data) {
      const element = data[key];
      const { Name } = element;
      list += `<option value = '${key}'> ${key} - ${Name} </option>`;
    }
    categoryIdCtrl.append(list);
  });

  $("#save").on("click", () => {
    const productIdCtrl = $("#productId");
    const name = $("#name").val();
    const price = $("#price").val();
    const description = $("#description").val();
    const quantity = $("#quantity").val();
    const product = new Product(
      categoryIdCtrl.val(),
      null,
      name,
      description,
      price,
      quantity
    );

    try {
      productService.insertProduct(product).then((data) => {
        productIdCtrl.val(data);
        alert("New product success");
      });
    } catch (error) {
      console.log(error);
    }
  });
});
