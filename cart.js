
document.addEventListener("DOMContentLoaded", function () {
    var cartIcon = document.querySelector(".cart_lan");
    var cart = document.querySelector(".cart");
    var closeCart = document.querySelector("#close-cart");


    cartIcon.addEventListener("click", function () {
        cart.classList.add("active");
    });

    closeCart.addEventListener("click", function () {
        cart.classList.remove("active");
    });

    function updateTotal() {
        var cartBoxes = document.getElementsByClassName("cart-box");
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.querySelector(".cart-price");
            var quantityElement = cartBox.querySelector(".cart-quantity");
            var price = parseFloat(priceElement.innerText.replace("Rs ", ""));
            var quantity = parseInt(quantityElement.value);
            total += price * quantity;
        }
        total = Math.round(total * 100) / 100;
        document.querySelector(".total-price").innerText = "Rs " + total;
    }

    function removeCartItem(event) {
        console.log("Delel")
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
    }

    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    const addCartButtons = document.querySelectorAll("#add-cart");

    addCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            console.log(e);
            addCartClicked(e); // Pass the clicked button to the function
        });
    });

    function addCartClicked(event) {
        var button = event.target;
        console.log(button);
        var shopProduct = button.parentElement;
        console.log(shopProduct)
        var title = shopProduct.querySelector(".cart-product-title").innerHTML;
        var price = shopProduct.querySelector(".cart-price").innerHTML;
        var productImg = shopProduct.querySelector(".product-img").src;
        addProductToCart(title, price, productImg);
        updateTotal();
    }

    function addProductToCart(title, price, productImg) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartItems = document.querySelector(".cart-content");
        var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert("You already added this item to cart. Increase Your Product Quantity");
                return;
            }
        }

        var cartBoxContent = `
        <img src="${productImg}" class="product-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fa-solid fa-trash cart-remove"></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.appendChild(cartShopBox);

        cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
        cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
    }

    document.querySelector(".btn-buy").addEventListener("click", function () {
        alert("Your Order is placed");
        var cartContent = document.querySelector(".cart-content");
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    });
});

