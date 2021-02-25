let urlProductList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
let productsList = {};
let cart = [];

async function getProductsCart(){
    await productList()
    let localCart = localStorage.getItem("cart");
    if (localCart !== null){
        cart = JSON.parse(localCart)
    }
    if(cart.length === 0){
        hideTable();
        return;
    }else{
        drawCart();
        getCartLenght();
        hideTable();
    }
}

async function productList(){
    let response = await fetch(urlProductList + ".json");
    productsList = await response.json();
}

function drawCart(){
    let html = "";
    let subtotal = 0;

    for(let [key, product] of Object.entries(productsList)){
        for(let i = 0; i < cart.length; i++){
            if(key === cart[i].id){
                subtotal += (parseInt(cart[i].quantity) * parseInt(product.productPrice))/parseInt("100");
                html += `
                <tr class="cart-item">
                    <td><img src="${product.image}" class="productImg"></td>
                    <td><a href="detalii.html?id=${cart[i].id}" class="idLink">${product.productName}</a></td>
                    <td>$ <span class="price">${product.productPrice}</span></td>
                    <td>
                        <div class="quantity">
                            <button class="decrement stock" onclick="decrement('${cart[i].id}'); event.preventDefault()">-</button>
                            <p class="stock"><span class="grams">${cart[i].quantity}</span> g</p>
                            <button class="increment stock" onclick="increment('${cart[i].id}'); event.preventDefault()">+</button>
                        </div>
                    </td>
                    <td>$ <span class="total">${((parseInt(cart[i].quantity) * parseInt(product.productPrice))/parseInt("100")).toFixed(2)}</span></td>
                    <td><a href="#" class="removeBtn" onclick="removeItem('${i}','${product.productName}')">Remove</a></td>
                </tr>
                `
            }
        }
   }
   document.querySelector(".productsCart tbody").innerHTML = html;
   document.querySelector(".subtotal .total").innerText = subtotal.toFixed(2);
}

async function removeItem(idx, name){
    document.querySelector(".loading").style.display = "block";
    if(confirm(`Are you sure you want to remove ${name}?`)){
        cart.splice(idx, 1);
        drawCart()
        localStorage.setItem("cart", JSON.stringify(cart));
        getCartLenght();
    }
    if(cart.length === 0){
        hideTable();
    }
    
    document.querySelector(".loading").style.display = "none";
}

function hideTable(){
    if(cart.length === 0){
        document.querySelector(".noProducts").style.display = "block";
        document.querySelector("main").style.display = "none";
        document.querySelector(".cartLenght").innerText = "(" + 0 +  ")";
    }else{
        document.querySelector("main").style.display = "block";
        document.querySelector(".noProducts").style.display = "none";
    }
}

function decrement(id){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
            if(cart[i].quantity === 100){
                return;
            }
            cart[i].quantity = parseInt(cart[i].quantity) - 100;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
}

function increment(id){
    let stock = "";

    for(let [key, product] of Object.entries(productsList)){
        if(key === id){
            stock = product.productStock;
            break;
        }
    }

    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
            if(parseInt(cart[i].quantity) === parseInt(stock)){
                alert("More quantity is not in stock")
                return;
            }
            cart[i].quantity = parseInt(cart[i].quantity) + 100;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart()
}

function getCartLenght(){
    let localCart = localStorage.getItem("cart");
    let cart = []
    if (localCart !== null){
        cart = JSON.parse(localCart)
    }
    if(cart !== null){
        let objectLenght = cart.length;
        document.querySelector(".cartLenght").innerText = "(" + objectLenght +  ")";
        document.querySelector(".cartLenght2").innerText = "(" + objectLenght +  ")";
    } 
}
