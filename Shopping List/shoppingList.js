var shoppingList = []

function draw(){
    let str = "";
    let str2 = `<thead>
                <tr>
                    <th>Item description</th>
                    <th>Action</th>
                </tr>
                </thead>
    `

    for(let i = 0; i < shoppingList.length; i++){
        if(shoppingList[i].action === "marked"){
            str +=`<tr>
                    <td title="itemTitle" class="markedItem">${shoppingList[i].item}</td>
                    <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsbuyed(${i});" onfocus="activeBorder(this);"></td>
                </tr>`
        }else{
            str +=`<tr>
                <td title="itemTitle">${shoppingList[i].item}</td>
                <td><input class="markBtn" type="button" name="buyedItem" value="Mark as buyed" onclick="markAsbuyed(${i});" onfocus="activeBorder(this);"></td>
                </tr>`
        }
    document.querySelector("#itemsList").innerHTML = str2 + str;
    }
}

function markAsbuyed(idx){
    for (let i = 0; i < shoppingList.length; i++){
        if(i === idx){
            shoppingList[i].action = "marked"
        }
    }
    draw()
}

function addItem(){
    let item = document.querySelector("[name='productName']").value;

    if (item.length !== 0 ){
        shoppingList.push({
            item: item
        })
    document.querySelector("[name='productName']").value = "";
    draw()
    }
}

function activeBorder(elem){
    elem.classList.add("borderActive")
}

function compare(a, b) {
    // in cazul in care userul foloseste prima litera mica, transform litera in mare pentru a fi toate egale la sortare
    const itemA = a.item.toUpperCase();
    const itemB = b.item.toUpperCase();
  
    let value = 0;
    if (itemA > itemB) {
      value = 1;
    } else if (itemA < itemB) {
      value = -1;
    }
    return value;
}

function sortAsc(){
    shoppingList.sort(compare);
    draw()
}

function sortDesc(){
    shoppingList.sort(compare);
    shoppingList.reverse()
    draw()
}
