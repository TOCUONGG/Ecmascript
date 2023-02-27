import "regenerator-runtime/runtime";
import FirebbaseConstants from "./constants/FirebbaseConstants";
import Product from "./models/Product";
import ProductService from "./services/ProductService";

class Product {
  constructor(categoryId, productId, name, description, price, quantity) {
    this.categoryId = categoryId;
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
$(document).ready(function () {
  const productService = new ProductService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  try {
    const placeholder = $("#placeholder");

    productService.findAllProduct().then((data) => {
      console.log(data);
      let list = "";
      for (const key in data) {
        const element = data[key];
        const { name, quantity, price, description } = element;
        list += `
          <tr>
          <td>${key}</td>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>${price}</td>
          <td>${description}</td>
          <td>
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <a href="editProduct.html?id=${key}"> Edit </a> |
          
          <a href="deleteProduct.html?id=${key}"><i class="fa fa-trash" aria-hidden="true"></i> 
          Delete </a> |
          
          </td>
          </tr>
          `;
      }
      placeholder.append(list);
    });
  } catch (error) {
    console.log(error);
  }
});
