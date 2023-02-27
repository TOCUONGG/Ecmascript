import "regenerator-runtime/runtime";
import FirebbaseConstants from "./constants/FirebbaseConstants";

import Category from "./models/Category";
import CategoryService from "./services/CategoryService";

$(document).ready(function () {
  $("#save").on("click", () => {
    const categoryIdCtrl = $("#categoryId");
    const name = $("#name").val();
    const cate = new Category(null, name);

    const categoryService = new CategoryService(
      FirebbaseConstants.RealTimeBB,
      "Token"
    );
    try {
      categoryService.insertCategory(cate).then((data) => {
        categoryIdCtrl.val(data);
      });
    } catch (error) {
      console.log(error);
    }

    console.log(cate);
    console.log("save click");
  });
});
