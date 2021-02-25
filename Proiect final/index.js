let urlProductsList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
let productsList = {};

async function getProducts(){
    document.querySelector(".loading").style.display = "block";
    let response = await fetch(urlProductsList + ".json");
    productsList = await response.json();
    drawProducts();
    document.querySelector(".loading").style.display = "none"
}

function drawProducts(){
    let html = "";
    if(checked.length === 0){
        for(let [id, product] of Object.entries(productsList)){
            html += `
                <div class="teaBox">
                    <div class="productCart">
                    <a href="detalii.html?id=${id}"><img class="teaImg" src="${product.image}"></a>
                    </div>
                    <p class="teaName">${product.productName}</p>
                    <div class="price">
                        <p>From $<span>${product.productPrice}</span></p>
                    </div>
                    <div class="buttonsCart">
                        <a href="detalii.html?id=${id}"><button class="details">Details</button></a>
                        <a href="#" onclick="addToCart('${id}'); event.preventDefault();"><button class="addCart">Add to cart</button></a>
                    </div>
                </div>
            `
            document.querySelector(".productsBox").innerHTML = html;
        }
    }else{
        for(let i = 0; i < checked.length; i++){
            for(let [id, product] of Object.entries(productsList)){
                if(checked[i] === product.typeOfTea){
                    html += `
                    <div class="teaBox">
                        <div class="productCart">
                        <a href="detalii.html?id=${id}"><img class="teaImg" src="${product.image}"></a>
                        </div>
                        <p class="teaName">${product.productName}</p>
                        <div class="price">
                            <p>From $<span>${product.productPrice}</span></p>
                        </div>
                        <div class="buttonsCart">
                            <a href="detalii.html?id=${id}"><button class="details">Details</button></a>
                            <a href="#" onclick="addToCart('${id}'); event.preventDefault();"><button class="addCart">Add to cart</button></a>
                        </div>
                    </div>
                `
                }
            }
            document.querySelector(".productsBox").innerHTML = html;
        }
    }
}

let checked = [];

function showProducs(elem){
    let checkedBox = elem;
    let labelText = elem.nextElementSibling.innerText;
    if(checkedBox.checked === true){
        checked.push(labelText)
    }else{
        for(let i = 0; i < checked.length; i++){
            if(labelText === checked[i]){
                checked.splice(i, 1);
            }
        }
    }
    getProducts()
}

function addToCart(id){
    let localCart = localStorage.getItem("cart");
    let cart = []
    let found = false;
    if (localCart !== null){
        cart = JSON.parse(localCart)
    }
    for(let item in cart){
        if(id === cart[item].id){
            alert("This product has already been added. Check your cart.");
            found = true;
            break;
        }
    }
    if(found === false){
        cart.push({id: id, quantity: 100 })
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartLenght()
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
