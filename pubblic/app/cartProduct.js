import "regenerator-runtime/runtime";
import FirebbaseConstants from "./constants/FirebbaseConstants";


// Initialize Firebase
$(document).ready(function () {
  const cartProduct = new ProductService(
    FirebbaseConstants.RealTimeBB,
    "Token"
  );
  try {
    // Initialize cart
    var cart = [];

    // Add product to cart
    function addToCart() {
      var name = document.getElementById("name").value;
      var price = parseFloat(document.getElementById("price").value);
      var quantity = parseInt(document.getElementById("quantity").value);

      // Validate input
      if (
        name.trim() == "" ||
        isNaN(price) ||
        isNaN(quantity) ||
        price < 0 ||
        quantity < 1
      ) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm và số lượng hợp lệ.");
        return;
      }

      // Check if product already exists in cart
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
          cart[i].quantity += quantity;
          updateCart();
          return;
        }
      }

      // Add product to cart
      cart.push({
        name: name,
        price: price,
        quantity: quantity,
      });

      updateCart();
    }

    // Update cart
    function updateCart() {
      var table = document.getElementById("cart");
      var total = 0;

      // Clear table
      while (table.rows.length > 1) {
        table.deleteRow(-1);
      }

      // Add products to table
      for (var i = 0; i < cart.length; i++) {
        var product = cart[i];
        var row = table.insertRow(-1);
        var nameCell = row.insertCell(0);
        var priceCell = row.insertCell(1);
        var quantityCell = row.insertCell(2);
        var totalCell = row.insertCell(3);
        var deleteCell = row.insertCell(4);

        nameCell.innerHTML = product.name;
        priceCell.innerHTML = product.price.toLocaleString() + " đồng";
        quantityCell.innerHTML = product.quantity;
        totalCell.innerHTML =
          (product.price * product.quantity).toLocaleString() + " đồng";
        deleteCell.innerHTML =
          '<button type="button" onclick="removeFromCart(' +
          i +
          ')">Xóa</button>';

        total += product.price * product.quantity;
      }

      // Update total
      document.getElementById("total").innerHTML =
        "Tổng tiền: " + total.toLocaleString() + " đồng";
    }

    // Remove product from cart
    // Remove product from cart
    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCart();
    }

    // Checkout
    function checkout() {
      if (cart.length == 0) {
        alert("Giỏ hàng của bạn đang trống.");
        return;
      }

      // Add cart to Firebase Realtime Database
      var database = firebase.database();
      var cartRef = database.ref("carts").push();
      cartRef.set({
        cart: cart,
        total: getTotal(),
      });

      // Clear cart
      cart = [];
      updateCart();

      // Show success message
      alert("Thanh toán thành công.");
    }

    // Get total
    function getTotal() {
      var total = 0;

      for (var i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
      }

      return total;
    }

    // Call getProducts to retrieve the initial
  } catch (error) {
    console.log(error);
  }
});
