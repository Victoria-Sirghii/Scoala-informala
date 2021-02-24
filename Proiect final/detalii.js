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

async function ajax(url, method, body){
    let response = await fetch(url+".json",{
        method: method, 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
            }
    });
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
                                <a href="#" onclick="addToCart2('${key}'); event.preventDefault()"><button class="addCart">Add to cart</button></a>
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
    let productStock = product.productStock;

    if(grams === productStock){
        document.querySelector(".warning").style.display = "block";
        return
    }else{
        price = price + parseInt(product.productPrice);
        document.querySelector(".price").innerText = price.toFixed(2);
        document.querySelector(".grams").innerText = 100 + grams;
    }
}
function decrement(){
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

let urlCart = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/shoppingCart/";
let productsCart = {};

async function getCartList(){
    productsCart = await ajax(urlCart);
}

async function addToCart(){
    let quantity = document.querySelector(".grams").innerText;
    let findProduct = false;
    let keyIndex = "";
    let oldQuantity = "";

    if(productsCart !== null){
        for(let [key, item] of Object.entries(productsCart)){
            if(id === item.id){
                keyIndex = key;
                findProduct = true;
                oldQuantity = item.quantity
            }
    }}

    if(findProduct === false){
        productsCart = await ajax(urlCart, "POST", 
            {
                "id": id,
                "quantity": quantity,
            })
        await getCartList()
        getCartLenght();
    }else{
        //verific daca stocul a fost depasit
        if((parseInt(quantity) + parseInt(oldQuantity)) > product.productStock){
            document.querySelector(".stockAvailable").innerText = product.productStock;
            document.querySelector(".warning2").style.display = "block";
            productsCart = await ajax(urlCart + keyIndex,"PUT", 
                {
                    "id": id,
                    "quantity": product.productStock,
                })
            await getCartList()
        }else{
            //Daca editez cantitatea produsului adaugat deja in cos,
            //in cos va aparea produsul o singura data cu cantitatea adunata
            productsCart = await ajax(urlCart + keyIndex,"PUT", 
            {
                "id": id,
                "quantity": parseInt(quantity) + parseInt(oldQuantity),
            })
            await getCartList()
        }
    }
}

async function addToCart2(id){
    let findProduct = false;

    //verific daca produsul a fost adaugat deja in cos
    if(productsCart !== null){
        for(let item in productsCart){
            if(id === productsCart[item].id){
                findProduct = true;
            }
    }}

    if(findProduct === false){
        productsCart =  await ajax(urlCart, "POST", 
            {
                "id": id,
                "quantity": "100",
            })
        await getCartList()
        getCartLenght();
    }else{
        alert("This product has already been added. Check your cart.");
    }
}

function getCartLenght(){
    if(productsCart !== null){
        let objectLenght = Object.keys(productsCart).length;
        document.querySelector(".cartLenght").innerText = "(" + objectLenght +  ")";
        document.querySelector(".cartLenght2").innerText = "(" + objectLenght +  ")";
    } 
}
