let urlProductsList = "https://e-shop-e08d6-default-rtdb.europe-west1firebasedatabase.app/produse/";
let productsList = {};

async function getProducts(){
    productsList =  await ajax(urlProductsList);
    drawTable();
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
            <tr>
                <td><img class="productImg" src="${product.image}"></td>
                <td><a href="#" class="nameLink" onclick="edit1('${id}')">${product.productName}</a></td>
                <td>$<span>${product.productPrice}</span></td>
                <td>${product.productStock}<span> g</span></td>
                <td><a href="#" class="removebtn" onclick="removeProduct('${id}')">Remove</a></td>
            </tr>
            `
            document.querySelector("#allProducts tbody").innerHTML = html;
        }
    }else{
        for(let i = 0; i < checked.length; i++){
            for(let [id, product] of Object.entries(productsList)){
                if(checked[i] === product.typeOfTea){
                    html += `
                    <tr>
                        <td><img class="productImg" src="${product.image}"></td>
                        <td><a href="#" class="nameLink" onclick="edit1('${id}')">${product.productName}</a></td>
                        <td>$<span>${product.productPrice}</span></td>
                        <td>${product.productStock}<span> g</span></td>
                        <td><a href="#" class="removebtn" onclick="removeProduct('${id}')">Remove</a></td>
                    </tr>
                `}
            }
        document.querySelector("#allProducts tbody").innerHTML = html;
        }
    }
}

async function addProduct(event){
    event.preventDefault();
    let typeOfTea = document.querySelector("#typeOfTea").value;
    let image = document.querySelector("#img").value;
    let productName = document.querySelector("#productName").value;
    let productDescription = document.querySelector("#productDescription").value;
    let productPrice = document.querySelector("#productPrice").value;
    let productStock = document.querySelector("#productStock").value;

    if(editIndex === -1){
        await ajax(urlProductsList, "POST", 
        {
            "typeOfTea": typeOfTea,
            "image": image,
            "productName": productName,
            "productDescription": productDescription,
            "productPrice": productPrice,
            "productStock": productStock
        })
        await getProducts();
    }else{
        await edit2()
    }

    document.querySelector(".addBox").reset();
    hideAddBox();
}

let editIndex = -1;

function edit1(idx){
    showAddBox();
    let product = productsList[idx];
    document.querySelector("#typeOfTea").value = product.typeOfTea
    document.querySelector("#img").value = product.image;
    document.querySelector("#productName").value = product.productName;
    document.querySelector("#productDescription").value = product.productDescription
    document.querySelector("#productPrice").value = product.productPrice;
    document.querySelector("#productStock").value = product.productStock;
    editIndex = idx;
}
async function edit2(){
    await ajax(urlProductsList+editIndex, "PUT", 
        {
            "typeOfTea": document.querySelector("#typeOfTea").value,
            "image": document.querySelector("#img").value,
            "productName": document.querySelector("#productName").value,
            "productDescription": document.querySelector("#productDescription").value,
            "productPrice": document.querySelector("#productPrice").value,
            "productStock": document.querySelector("#productStock").value,
        })
    await getProducts();
    editIndex = -1;
}
async function removeProduct(idx){
    if(confirm(`Are you sure you want to remove ${productsList[idx].productName}?`)){ 
        await ajax(urlProductsList+idx, "DELETE")
        await getProducts();
    }
    await getProducts();
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
    await getProducts()
}
function showAddBox(){
    document.querySelector(".addBox").classList.remove("hidden")
    document.querySelector(".teaList").classList.add("hidden")
    document.querySelector(".productsTable").classList.add("hidden")
}
function hideAddBox(){
    document.querySelector(".addBox").classList.add("hidden")
    document.querySelector(".teaList").classList.remove("hidden")
    document.querySelector(".productsTable").classList.remove("hidden")
}
