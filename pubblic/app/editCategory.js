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
  const categoryIdCtrl = $("#categoryId");
  const nameCtrl = $("#name");

  categoryService.findById(id).then((data) => {
    const { name } = data;
    categoryIdCtrl.val(id);
    nameCtrl.val(name);
  });

  $("#update").on("click", () => {
    const cate = new Category(null, nameCtrl.val());

    try {
      categoryService
        .updateCategory(categoryIdCtrl.val(), cate)
        .then((data) => {
          location.href = "listCategory.html";
        });
    } catch (error) {
      console.log(error);
    }

    console.log(cate);
    console.log("save click");
  });
});
