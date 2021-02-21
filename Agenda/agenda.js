let url = "https://agenda-94fca-default-rtdb.europe-west1.firebasedatabase.app/Agenda/"
var agendaList = {}
var indexEditare = -1;

async function getLista(){
    const response = await fetch(url+".json");
    agendaList = await response.json();
    if(agendaList===null){
        agendaList = {};
        document.querySelector("#tableHead").classList.add(".hidden")
    }else{
        showTable()
    }
    draw();
}

function draw(){
    let str = "";
    for(let [keyCode, contact] of Object.entries(agendaList)){
        str += `<tbody>
                <tr>
                    <td>${contact.nume}</td>
                    <td>${contact.tel}</td>
                    <td onclick="edit1('${keyCode}')";"><a href="#">Modifica</a></td>
                    <td class="link" onclick="del('${keyCode}');"><a href="#">Sterge</a></td>
                </tr>
                </tbody>`;
    }
    document.querySelector("table tbody").innerHTML = str;

}

async function addContact(){
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
        const response = await fetch(url+".json",{
            method: "post",
            body: JSON.stringify({
                "nume": nume,
                "tel": tel
            }),
            headers:{
                'Content-Type': 'application/json'
            },
        });
        await response.json();
        await getLista()
    }// adaugarea in caz de editare
    else{
        document.querySelector("#error2").classList.add("hidden")
        let agendaList = {};
        agendaList.nume = document.querySelector("#nameUser").value;
        agendaList.tel = document.querySelector("#telUser").value;
        const response = await fetch(url+indexEditare+".json", {
            method:"put",
            body: JSON.stringify(agendaList),
            headers: {
              'Content-Type': 'application/json'
            },
        });
        await response.json();
        await getLista();
        indexEditare= -1;
    }
    
    document.querySelector("form").reset();
    showTable();
}
 /*functia de adaugare fara baza de date!
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
}*/

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

async function del(idx){
    if(confirm(`Esti sigur ca vrei sa stergi acest contact: ${agendaList[idx].nume} cu numarul ${agendaList[idx].tel}?`)){
        const response = await fetch(url+idx+".json",{
            method:"Delete"
        });
        await response.json();
        await getLista();
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

