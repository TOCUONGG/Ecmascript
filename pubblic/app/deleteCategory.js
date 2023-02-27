import "regenerator-runtime/runtime";
import FirebbaseConstants from "./constants/FirebbaseConstants";
import UrlHelper from "./helpers/UrlHelper";

import Category from "./models/Category";
import CategoryService from "./services/CategoryService";

$(document).ready(function () {
  const categoryService = new CategoryService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");

  categoryService.deleteCategory(id).then((data) => {
    location.href = "listCategory.html";
  });
});
