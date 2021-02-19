let urlProductsList = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/produse/";
let productsList = {};

async function getProducts(){
    productsList = await ajax(urlProductsList);
    drawProducts();
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
                            <img class="teaImg" src="${product.image}">
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

let urlCart = "https://e-shop-e08d6-default-rtdb.europe-west1.firebasedatabase.app/shoppingCart/";
let productsCart = {};

async function getCartList(){
    productsCart = await ajax(urlCart);
    getCartLenght();
}

async function addToCart(id){
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
                "quantity": 100,
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
    } 
}
