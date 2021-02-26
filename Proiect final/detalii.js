let product = {};
let productsList = {}
let urlProductsList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
var id = window.location.search.substr(4);


async function getProduct(){
    document.querySelector(".loading").style.display = "block";
    product = await ajax(urlProductsList + id);
    await getProductsList()
    drawProduct();
    getCartLenght();
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".quantityCart").style.display = "flex";
    document.querySelector(".addToWish").style.display = "flex";
}

async function getProductsList(){
    productsList = await ajax(urlProductsList);
    drawCarousel()
    getCartLenght();
}

async function ajax(url){
    let response = await fetch(url+".json");
    return await response.json();
}

function drawProduct(){
    document.querySelector(".teaImg").src = product.image;
    document.querySelector(".description").innerText = product.productDescription;
    document.querySelector(".productInfo h2").innerText = product.productName;
    document.querySelector(".price").innerText = product.productPrice;
    document.querySelector(".typeOf").innerText = product.typeOfTea.toUpperCase() + " /";
    document.querySelector(".teaName").innerText = product.productName.toUpperCase();
}

function drawCarousel(){
    let itemDivs = document.querySelectorAll(".item");
    let count = 1 ;

    for(let [key, item] of Object.entries(productsList)){
        for(let i = count; i < itemDivs.length; i++){
            //pun conditia pentru a nu repeta produsul in carousel
            if(key === id){
                count--;
                break;
            }else{
                itemDivs[i].innerHTML = `
                    <div class="swiper-slide">
                        <div class="teaBox">
                            <div class="productCart">
                                <a href="detalii.html?id=${key}"><img class="carouselImg" src="${item.image}"></a>
                            </div>
                            <p class="teaName">${item.productName}</p>
                            <div class="price">
                                <p>From $<span>${item.productPrice}</span></p>
                            </div>
                            <div class="buttonsCart">
                                <a href="detalii.html?id=${key}"><button class="details">Details</button></a>
                                <button class="addCart" onclick="addToCart2('${key}'); event.preventDefault()">Add to cart</button>
                            </div>
                        </div>
                    </div>
                    `   
            count++
            break
            }
        }
    }
}

function increment(){
    let grams = parseInt(document.querySelector(".grams").innerText);
    let price = parseInt(document.querySelector(".price").innerText)

    if(grams === parseInt(product.productStock)){
        document.querySelector(".warning").style.display = "block";
        return;
    }else{
        price = price + parseInt(product.productPrice);
        document.querySelector(".price").innerText = price.toFixed(2);
        document.querySelector(".grams").innerText = 100 + grams;
    }
}
function decrement(){
    document.querySelector(".warning").style.display = "none";
    let grams = parseInt(document.querySelector(".grams").innerText);
    let price = parseInt(document.querySelector(".price").innerText)
    if(grams === 100){
        return
    }else{
        price = price - parseInt(product.productPrice);
        document.querySelector(".price").innerText = price.toFixed(2);
        document.querySelector(".grams").innerText = grams - 100;
    }
}

function addToCart(){
    let quantity = parseInt(document.querySelector(".grams").innerText);
    let oldQuantity = ""
    let localCart = localStorage.getItem("cart");
    let cart = []
    let found = false;
    if (localCart !== null){
        cart = JSON.parse(localCart)
    }
    for(let item in cart){
        if(id === cart[item].id){
            found = true;
            oldQuantity = parseInt(cart[item].quantity)
            if((oldQuantity + quantity) < parseInt(product.productStock)){
                cart[item].quantity += quantity;
            }else{
                cart[item].quantity = product.productStock;
                document.querySelector(".stockAvailable").innerText = product.productStock;
                document.querySelector(".warning2").style.display = "block";
            }
            break;
        }
    }
    if(found === false){
        if(quantity > parseInt(product.productStock)){
            quantity = product.productStock;
            document.querySelector(".stockAvailable").innerText = product.productStock;
            document.querySelector(".warning2").style.display = "block";
        }
        cart.push({id: id, quantity: quantity })
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartLenght()
}

async function addToCart2(id){
    let localCart = localStorage.getItem("cart");
    let productStock = "";
    let cart = []
    let found = false;
    if (localCart !== null){
        cart = JSON.parse(localCart)
    }

    for(let item in productsList){
        if(item === id){
            productStock = productsList[item].productStock;
        }
    }

    for(let item in cart){
        if(id === cart[item].id){
            found = true;
            cart[item].quantity = parseInt(cart[item].quantity) + 100;
            //in cazul in care depaseste cantitatea afisez toast
            if(parseInt(productStock) < cart[item].quantity){
                document.querySelector(".productStock").innerText = productStock;
                let x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                return;
            }
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

