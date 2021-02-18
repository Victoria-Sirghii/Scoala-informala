let urlProductsCart = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/shoppingCart/";
let urlProductList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
let productsCart = {};
let productsList = {};

async function getProductsCart(){
    let response = await fetch(urlProductsCart + ".json");
    productsCart = await response.json();
    await productList();

    if(productsCart === null){
        hideTable();
        return;
    }else{
        drawCart();
        objectLenght();
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
        for(let [productkey, productCart] of Object.entries(productsCart)){
            if(key === productCart.id){
                subtotal += (parseInt(productCart.quantity) * parseInt(product.productPrice))/parseInt("100");
                html += `
                <tr class="cart-item">
                    <td><img src="${product.image}" class="productImg"></td>
                    <td><a href="detalii.html?id=${productCart.id}" class="idLink">${product.productName}</a></td>
                    <td>$ <span class="price">${product.productPrice}</span></td>
                    <td>
                        <div class="quantity">
                            <button class="decrement stock" onclick="decrement('${productkey}', '${productCart.id}');">-</button>
                            <p class="stock"><span class="grams">${productCart.quantity}</span> g</p>
                            <button class="increment stock" onclick="increment('${productkey}' , '${productCart.id}');">+</button>
                        </div>
                        <p class="warningText">More quantity is not in stock</p>
                    </td>
                    <td>$ <span class="total">${(parseInt(productCart.quantity) * parseInt(product.productPrice))/parseInt("100")+ ".00"}</span></td>
                    <td><a href="#" class="removeBtn" onclick="removeItem('${productkey}', '${product.productName}')">Remove</a></td>
                </tr>
                `
        }
    }
   }
   document.querySelector(".productsCart tbody").innerHTML = html;
   document.querySelector(".subtotal .total").innerText = subtotal.toFixed(2);
}

async function removeItem(idx, name){
    if(confirm(`Are you sure you want to remove ${name}?`)){
        let response = await fetch(urlProductsCart + idx + ".json",{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
                }
        })
        productsCart = await response.json();
    }
    await getProductsCart()
}

function hideTable(){
    // let objectLenght = Object.keys(productsCart).length; 
    if(productsCart === null){
        document.querySelector(".noProducts").style.display = "block";
        document.querySelector("main").style.display = "none";
        document.querySelector(".cartLenght").innerText = "(" + 0 +  ")";
    }else{
        document.querySelector("main").style.display = "block";
        document.querySelector(".noProducts").style.display = "none";
    }
}

async function decrement(idx, id){
    //
    let grams = ""
    for(let [key, item] of Object.entries(productsCart)){
        if(item.id === id){
            grams = item.quantity
        }
    }

    if(grams === 100){
        return
    }else{
        let response = await fetch(urlProductsCart + idx + ".json",{
            method: "PUT",
            body: JSON.stringify({
                "id": id,
                "quantity": parseInt(grams) - 100
            }),
            headers: {
                'Content-Type': 'application/json'
                }
        })
        productsCart = await response.json();
        await getProductsCart()
    }
}
async function increment(idx, id){
    let stock = "";
    let grams = ""
    for(let [key, item] of Object.entries(productsCart)){
        if(item.id === id){
            grams = item.quantity
        }
    }
    for(let [key, product] of Object.entries(productsList)){
        if(key === id){
            stock = product.productStock;
        }
    }
    if(grams === parseInt(stock)){
        document.querySelector(".warningText").style.display = "block";
        return
    }else{
        let response = await fetch(urlProductsCart + idx + ".json",{
            method: "PUT",
            body: JSON.stringify({
                "id": id,
                "quantity": parseInt(grams) + 100
            }),
            headers: {
                'Content-Type': 'application/json'
                }
            })
        productsCart = await response.json();
        await getProductsCart()
    }
}

function objectLenght(){
    let objectLenght = Object.keys(productsCart).length; 
    document.querySelector(".cartLenght").innerText = "(" + objectLenght +  ")";
}
