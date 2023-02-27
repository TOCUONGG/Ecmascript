import "regenerator-runtime/runtime";
import FirebbaseConstants from "./constants/FirebbaseConstants";

import Category from "./models/Category";
import CategoryService from "./services/CategoryService";

$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  try {
    const placeholder = $("#placeholder");

    categoryService.findAllCategory().then((data) => {
      console.log(data);
      let list = "";
      for (const key in data) {
        const element = data[key];
        const { Name } = element;
        list += `
          <tr>
          <td>${key}</td>
          <td>${Name}</td>
          <td>
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <a href="editCategory.html?id=${key}"> Edit </a> |
          
          <a href="deleteCategory.html?id=${key}"><i class="fa fa-trash" aria-hidden="true"></i> 
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
