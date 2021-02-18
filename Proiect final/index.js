
let urlProductsList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
let productsList = {};

async function getProducts(){
    let response = await fetch(urlProductsList + ".json");
    productsList = await response.json();
    drawProducts();
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
                        <a href="#" onclick="addItem('${id}');"><button class="addCart">Add to cart</button></a>
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
                            <img class="teaImg" src="${product.image}">
                        </div>
                        <p class="teaName">${product.productName}</p>
                        <div class="price">
                            <p>From $<span>${product.productPrice}</span></p>
                        </div>
                        <div class="buttonsCart">
                            <a href="detalii.html?id=${id}"><button class="details">Details</button></a>
                            <a href="#" onclick="addItem('${id}'); event.preventDefault();"><button class="addCart">Add to cart</button></a>
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

let urlCart = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/shoppingCart/";
let productsCart = {};

async function getCartList(){
    let response = await fetch(urlCart + ".json");
    productsCart = await response.json();
    objectLenght();
}

function objectLenght(){
    let objectLenght = Object.keys(productsCart).length; 
    document.querySelector(".cartLenght").innerText = "(" + objectLenght +  ")";
}

async function addItem(id){
    let findProduct = false;
    let keyIndex = "";
    let oldQuantity = "";

    if(productsCart !== null){
        for(let [key, item] of Object.entries(productsCart)){
            if(id === item.id){
                keyIndex = key;
                findProduct = true;
                oldQuantity = item.quantity;
            }
    }}

    if(findProduct === false){
        let response = await fetch(urlCart + ".json", {
            method: "POST",
            body: JSON.stringify({
                "id": id,
                "quantity": 100,
            }),
            headers: {
                'Content-Type': 'application/json'
                }
        });
        productsCart =  await response.json();
        await getCartList()
        objectLenght();
    }else{
        alert("The product is in the cart, please check it!");
    }
}
