function openNavMenu(){
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
}

function removeNavMenu(){
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    let modal = document.querySelector(".modal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }