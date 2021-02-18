let product = {};
let productsList = {}
let urlProductsList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
var id = window.location.search.substr(4);

async function getProduct(){
    let response = await fetch(urlProductsList + id + ".json");
    product = await response.json();
    await getProductsList()
    drawProduct();
    objectLenght();
}

async function getProductsList(){
    let response = await fetch(urlProductsList + ".json");
    productsList = await response.json();
    drawCarousel();
}


function drawProduct(){
    document.querySelector(".image").src = product.image;
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
                                <a href="detalii.html?id=${key}"><img class="teaImg" src="${item.image}"></a>
                            </div>
                            <p class="teaName">${item.productName}</p>
                            <div class="price">
                                <p>From $<span>${item.productPrice}</span></p>
                            </div>
                            <div class="buttonsCart">
                                <a href="detalii.html?id=${key}"><button class="details">Details</button></a>
                                <a href="#"><button class="addCart">Add to cart</button></a>
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
        document.querySelector(".price").innerText = price + ".00";
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
        document.querySelector(".price").innerText = price + ".00";
        document.querySelector(".grams").innerText = grams - 100;
    }
}

let urlCart = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/shoppingCart/";
let productsCart = {};

async function getCartList(){
    let response = await fetch(urlCart + ".json");
    productsCart = await response.json();
}


async function addItemToCart(event){
    event.preventDefault();

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
        let response = await fetch(urlCart + ".json", {
            method: "POST",
            body: JSON.stringify({
                "id": id,
                "quantity": quantity,
            }),
            headers: {
                'Content-Type': 'application/json'
                }
        });
        productsCart =  await response.json();
        await getCartList()
        objectLenght();
    }else{
        //verific daca stocul a fost depasit
        if((parseInt(quantity) + parseInt(oldQuantity)) > product.productStock){
            document.querySelector(".stockAvailable").innerText = product.productStock;
            document.querySelector(".warning2").style.display = "block";
            let response = await fetch(urlCart + keyIndex + ".json", {
                method: "PUT",
                body: JSON.stringify({
                    "id": id,
                    "quantity": product.productStock,
                }),
                headers: {
                    'Content-Type': 'application/json'
                    }
            });
            productsCart = await response.json();
            await getCartList()
        }else{
            //Daca editez cantitatea produsului adaugat deja in cos,
            //in cos va aparea produsul o singura data cu cantitatea adunata
            let response = await fetch(urlCart + keyIndex + ".json", {
                method: "PUT",
                body: JSON.stringify({
                    "id": id,
                    "quantity": parseInt(quantity) + parseInt(oldQuantity),
                }),
                headers: {
                    'Content-Type': 'application/json'
                    }
            });
            productsCart = await response.json();
            await getCartList()
        }
    }
}

function objectLenght(){
    let objectLenght = Object.keys(productsCart).length; 
    document.querySelector(".cartLenght").innerText = "(" + objectLenght +  ")";

}

// function openNavMenu(){
//     document.querySelector(".mobile-menu").style.width = "70%"
// }
// function removeNavMenu(){
//     document.querySelector(".mobile-menu").style.width = "0"
// }