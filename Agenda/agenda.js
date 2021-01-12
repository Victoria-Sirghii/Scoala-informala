var agendaList = []

var indexEditare = -1;

function draw(){
    let str = "";
    let headTable = `<thead>
                        <tr>
                            <th>Nume</th>
                            <th>Telefon</th>
                        </tr>
                    </thead>`;

    for(let i = 0; i< agendaList.length; i++){
        str += `<tbody>
                <tr>
                    <td>${agendaList[i].nume}</td>
                    <td>${agendaList[i].tel}</td>
                    <td onclick="edit1(${i});"><a href="#">Modifica</a></td>
                    <td class="link" onclick="del(${i});"><a href="#">Sterge</a></td>
                </tr>
                </tbody>`;
    }
    document.querySelector("table").innerHTML = headTable + str;
}

function addContact(){
    let nume = document.querySelector("#nameUser").value;
    let tel = document.querySelector("#telUser").value;

    // validarea finala inainte de a adauga input-ul in tabel
    for (let i = 0; i < tel.length; i++){
        if(!(tel[i] >= 0 && tel[i] <= 9 || tel[i] === "+")){
            document.querySelector("[name='telUser']").classList.add("invalid")
            document.querySelector("#error").classList.remove("valid")
            return;
        }
    }

    if((nume && tel) === ""){
        document.querySelector("#error2").classList.remove("hidden")
        return;
    }else if(indexEditare === -1){
        document.querySelector("#error2").classList.add("hidden")
        agendaList.push({
            nume: nume,
            tel: tel,
        })
    }// adaugarea in caz de editare
    else{
        document.querySelector("#error2").classList.add("hidden")
        let contact = agendaList[indexEditare];
        contact.nume =  document.querySelector("#nameUser").value;
        contact.tel = document.querySelector("#telUser").value;
 
        indexEditare= -1;
    }

    draw();
    //afisez tableBox care este ascuns
    showTable();

    document.querySelector("form").reset();
}

function enterKey(event){
    if(event.keyCode === 13){
            addContact()
    }
}

function showTable(){
    let table = document.querySelector("#tableBox");
    table.classList.remove("hidden");
}

function telValidation(elem){
    let errorMessage = elem.nextElementSibling;
    let tel = document.querySelector("#telUser").value;
    let invalid = false;

    //verific daca tel contine litere
    for(let i = 0; i < tel.length; i++){
        if(!(tel[i] >= "0" && tel[i] <= "9" || tel[i] === "+")){
            invalid = true;
        }
    }

    if(invalid === true){
        errorMessage.classList.remove("valid")
        document.querySelector("[ name='telUser']").classList.add("invalid")
        return
    }else{
        errorMessage.classList.add("valid")
        document.querySelector("[name='telUser']").classList.remove("invalid")
    }
}

function maximLength(elem, event, max){
    if (elem.value.length > max && elem.value.length > max){
        event.preventDefault();
    }
}

function del(idx){
    if(confirm(`Esti sigur ca vrei sa stergi acest contact: ${agendaList[idx].nume} cu numarul ${agendaList[idx].tel}?`)){
        agendaList.splice(idx,1);
        draw();
    }
    //ascund tableBox in cazul in care user-ul sterge toate contactele
    hideTable();
}

function hideTable(){
    let table = document.querySelectorAll("td");
    let tableBox = document.querySelector("#tableBox");
    if(table.length === 0){
        tableBox.classList.add("hidden");
    }
}

function edit1(idx){
    let contact = agendaList[idx];
    document.querySelector("#nameUser").value = contact.nume;
    document.querySelector("#telUser").value = contact.tel;
    indexEditare = idx;
}

