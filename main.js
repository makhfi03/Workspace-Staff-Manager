let zoneTargeted = "";
let data=[];
data.forEach(d=>{
  renderCard(d)})

let form = document.forms["ajouterWorker"];
let employeContainer = document.getElementById("dynamiqueForm");
let afficherProfil = document.getElementById("affichProfil");
let zone1=[]
let zone2=[]
let zone3=[]
let zone4=[]
let zone5=[]
let zone6=[]

getZonesData()
renderCardSideBar()
colorCheckZones()
renderCardZone("z1")
renderCardZone("z2")
renderCardZone("z3")
renderCardZone("z4")
renderCardZone("z5")
renderCardZone("z6")
  
document.getElementById("ajouteExperience").addEventListener("click", () => {
  employeContainer.innerHTML += `
  <div class="form-group">
  <label for="name" class="form-label">Entreprise: </label>
  <input type="text" name="name" id="name" placeholder="Nom d'entreprise" class="form-control">
  </div>
  <div class="form-group">
  <label for="roleEntreprise" class="form-label">Rôle: </label>
  <input type="text" name="roleEntreprise" id="roleEntreprise" placeholder="Votre rôle" class="form-control">
  </div>
  `});
 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let objet = {
    nom: form.nom.value,
    role: form.role.value,
    email: form.email.value,
    phone: form.phone.value,
    photo: form.photo.value,
    dynamiqueForm: []
  };

if(form.name.length){
  for (let i = 0; i < form.name.length; i++){
    objet.dynamiqueForm.push(
      {
        name: form.name[i].value,
        roleEntreprise: form.roleEntreprise[i].value
      }
    )}}
    else{
      objet.dynamiqueForm.push(
      {
        name: form.name.value,
        roleEntreprise: form.roleEntreprise.value
      }
    );
    }

renderCard(objet);
data.push(objet)
localStorage.setItem("myData", JSON.stringify(data));
form.reset();
});

function renderCard(objet) {
  let cardlist = document.getElementById("card-sidebar");
  let card = document.createElement('div');
  card.innerHTML += createCard(objet);
  cardlist.appendChild(card);
  document.querySelectorAll(`[btnRole="showProfile"]`).forEach(btn=>{
    btn.addEventListener("click",e=>{
       const employeeId = e.target.closest("[email]").getAttribute("email");
       console.log(employeeId)
  const objet = data.find(e=>e.email === employeeId);
  afficherProfil.innerHTML = `
  <img src=${objet.photo} id="profil-photo" class="img-thumbnail w-50 d-block mx-auto mb-3">
  <p><strong>Nom :</strong> <span id="profil-nom">${objet.nom}</span></p>
  <p><strong>Rôle :</strong> <span id="profil-role">${objet.role}</span></p>
  <p><strong>Email :</strong> <span id="profil-email">${objet.email}</span></p>
  <p><strong>Téléphone :</strong> <span id="profil-phone">${objet.phone}</span></p>
  <h5>Expériences :</h5>
  <ul id="profil-experience">${objet.dynamiqueForm.map(e=>`<li>
      <h4>Name : <span>${e.name}</span></h4>
      <h4>Role : <span>${e.roleEntreprise}</span></h4>
      </li>`).join("")}</ul>
  `})
  })
}

function createCard(objet) {
  let cards = "";
  cards += `
              <div class="card my-2" style="max-width: 21rem"  id="card-list" email="${objet.email}">
                <div class="d-flex justify-content-center w-25" id="img">
                  <img src="${objet.photo}" class="img-thumbnail background-sizi" alt="...">
                </div>
                <div class="card-body col-12 col-md-12">
                  <div class="d-flex justify-content-between m-4">
                    <div id="">
                      <span>${objet.nom}
                      </span>
                    </div>
                    <div id="role">
                      <span>${objet.role}</span>
                    </div>
                  </div>
                  <div class="w-100" id="profile">
                  <button  btnRole="showProfile" type="button" class="btn btn-outline-info w-100 m-2" 
                  data-bs-toggle="modal" data-bs-target="#exampleModalProfil">Voir profil</button>
                  </div>
                  <div class="w-100" id="edit">
                    <button email="" class="btn btn-primary w-100 m-2" type="button" 
                    data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Modifier</button>
                  </div>
                </div>
                 </div>
`
return cards}

document.querySelectorAll(`[data-bs-target="#showEmployes"]`).forEach(btn=>{
  btn.addEventListener("click",e=>{  
    let id = e.target.parentElement.id  
    let html = "" ;
    html +=  data.map(e=>`${createRoomCard(e)}`).join("");
    document.querySelector("#showEmployesBody").innerHTML = html
    let assigner = document.querySelectorAll(".assigner");
    assigner.forEach(elt => {
      
  elt.addEventListener("click", event=>{
     let email = event.target.parentElement.id
     let index = data.findIndex(idx=> email == idx.email)
     const zones = document.querySelectorAll('.zones')
     zones.forEach(zone=>{
      if(zone.id == id){
      let cardRome = `
    <article id=${data[index].email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${data[index].photo} alt=${data[index].nom} class="">
      <div class="flex-grow-1">
        <h4>${data[index].nom}</h4>
        <p>${data[index].role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${zone.id})">delete</button>
    </article>
  `
  if(zone.id === "zone1"){
    if(zone1.length < 4){
      zone1.push(data[index])
    data.splice(index,1)
    renderCardSideBar();
    renderCardZone("z1");
    zoneLocalStorage()
    }else{
      alert('Zone plein')
    }
    
  }
  if(zone.id === "zone2"){
    if(data[index].role == "IT" || data[index].role == "Manager" || data[index].role == "Nettoyage"){
    if(zone2.length < 4){
    zone2.push(data[index])
    data.splice(index,1)
    renderCardSideBar();
    renderCardZone("z2");
    colorCheckZones()
    zoneLocalStorage()
    }else{
      alert('Zone plein')
    }
    }else{
      document.getElementById("messageAlert").style.display = "block";
      setTimeout(alert, 2000);
    }
  }
  if(zone.id === "zone3"){
    if(zone3.length < 4){
    zone3.push(data[index])
    data.splice(index,1)
    renderCardSideBar();
    renderCardZone("z3");
    colorCheckZones()
    zoneLocalStorage()
    }else{
      alert('Zone plein')
    }
  }
  if(zone.id === "zone4"){
    if(zone4.length < 4){
    zone4.push(data[index])
    data.splice(index,1)
    renderCardSideBar();
    renderCardZone("z4");
    colorCheckZones()
    zoneLocalStorage()
    }else{
      alert('Zone plein')
    }
  }
  if(zone.id === "zone5"){
    if(zone5.length < 4){
    zone5.push(data[index])
    data.splice(index,1)
    renderCardSideBar();
    renderCardZone("z5");
    zoneLocalStorage()
    }else{
      alert('Zone plein')
    }
  }
  if(zone.id === "zone6"){
    if(zone6.length < 4){
    zone6.push(data[index])
    data.splice(index,1)
    renderCardSideBar();
    renderCardZone("z6");
    colorCheckZones()
    zoneLocalStorage()
    }else{
      alert('Zone plein')
    }
  }
 }
  })
  })
})
})
});

function alert(){
  document.getElementById("messageAlert").style.display = "none"
}

function createRoomCard(staff){
  return `
    <article id=${staff.email} class="d-flex align-items-center gap-3">
      <img width="48" height="48" src=${staff.photo} alt=${staff.nom} class="">
      <div class="flex-grow-1">
        <h4>${staff.nom}</h4>
        <p>${staff.role}</p>
      </div>
      <button data-bs-dismiss="modal" class="assigner">Assigner</button>
    </article>
  `}

function renderCardSideBar() {
 let card = document.getElementById("card-sidebar")
 card.innerHTML=""
 data.forEach(o => {
  card.innerHTML +=  `
              <div class="card-body row d-flex justify-content-center" id="card-list" email="${o.email}">
                <div class="col-12 col-md-12 d-flex justify-content-center w-25" id="img">
                  <img src="${o.photo}" class="img-thumbnail background-sizi" alt="...">
                </div>
                <div class="col-12 col-md-12">
                  <div class="d-flex justify-content-between m-4">
                    <div id="">
                      <span>${o.nom}
                      </span>
                    </div>
                    <div id="role">
                      <span>${o.role}</span>
                    </div>
                  </div>
                  <div class="w-100" id="profile">
                  <button  btnRole="showProfile" type="button" class="btn btn-primary" 
                  data-bs-toggle="modal" data-bs-target="#exampleModalProfil">Voir profil</button>
                  </div>
                  <div class="w-100" id="edit">
                    <button email="" class="btn btn-primary w-100 m-2" type="button" 
                    data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Modifier</button>
                  </div>
                </div>
                 </div>
`
 }) 
}

function renderCardZone(z){
  if(z=="z1"){
  let zonation = document.querySelector(".zone1")
  zonation.innerHTML = ""
  zone1.forEach((element,index) =>{
    zonation.innerHTML +=  `
    <article id=${element.email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${element.photo} alt=${element.nom} class="">
      <div class="flex-grow-1">
        <h4>${element.nom}</h4>
        <p>${element.role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${"zone1"})">delete</button>
    </article>
  `})
  }
  if(z=="z2"){
  let zonation = document.querySelector(".zone2")
  zonation.innerHTML = ""
  zone2.forEach((element,index) =>{
    zonation.innerHTML +=  `
    <article id=${element.email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${element.photo} alt=${element.nom} class="">
      <div class="flex-grow-1">
        <h4>${element.nom}</h4>
        <p>${element.role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${"zone2"})">delete</button>
    </article>
  `})
  }
  if(z=="z3"){
  let zonation = document.querySelector(".zone3")
  zonation.innerHTML = ""
  zone3.forEach((element,index) =>{
    zonation.innerHTML +=  `
    <article id=${element.email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${element.photo} alt=${element.nom} class="">
      <div class="flex-grow-1">
        <h4>${element.nom}</h4>
        <p>${element.role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${"zone3"})">delete</button>
    </article>
  `})
  }
  if(z=="z4"){
  let zonation = document.querySelector(".zone4")
  zonation.innerHTML = ""
  zone4.forEach((element,index) =>{
    zonation.innerHTML +=  `
    <article id=${element.email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${element.photo} alt=${element.nom} class="">
      <div class="flex-grow-1">
        <h4>${element.nom}</h4>
        <p>${element.role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${"zone4"})">delete</button>
    </article>
  `})
  }
  if(z=="z5"){
  let zonation = document.querySelector(".zone5")
  zonation.innerHTML = ""
  zone5.forEach((element,index) =>{
    zonation.innerHTML +=  `
    <article id=${element.email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${element.photo} alt=${element.nom} class="">
      <div class="flex-grow-1">
        <h4>${element.nom}</h4>
        <p>${element.role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${"zone5"})">delete</button>
    </article>
  `})
  }
  if(z=="z6"){
  let zonation = document.querySelector(".zone6")
  zonation.innerHTML = ""
  zone6.forEach((element,index) =>{
    zonation.innerHTML +=  `
    <article id=${element.email} class="d-flex bg-white overflow-auto gap-3">
      <img width="48" height="48" src=${element.photo} alt=${element.nom} class="">
      <div class="flex-grow-1">
        <h4>${element.nom}</h4>
        <p>${element.role}</p>
      </div>
      <button id="assigner" onclick="deleteCardZone(${index},${"zone6"})">delete</button>
    </article>
  `})
  }
}

function deleteCardZone(index, zone){
  if(zone === zone1||zone === "zone1"){
    data.push(zone1[index])
    zone1.splice(index,1)
    renderCardSideBar();
    renderCardZone("z1");
    zoneLocalStorage()
  }
  if(zone === zone2||zone === "zone2"){
    data.push(zone2[index])
    zone2.splice(index,1)
    renderCardSideBar();
    renderCardZone("z2");
    colorCheckZones()
    zoneLocalStorage()
  }
  if(zone === zone3||zone === "zone3"){
    data.push(zone3[index])
    zone3.splice(index,1)
    renderCardSideBar();
    renderCardZone("z3");
    colorCheckZones()
    zoneLocalStorage()
  }
  if(zone === zone4||zone === "zone4"){
    data.push(zone4[index])
    zone4.splice(index,1)
    renderCardSideBar();
    renderCardZone("z4");
    colorCheckZones()
    zoneLocalStorage()
  }
  if(zone === zone5||zone === "zone5"){
    data.push(zone5[index])
    zone5.splice(index,1)
    renderCardSideBar();
    renderCardZone("z5");
    zoneLocalStorage()
  }
  if(zone === zone6||zone === "zone6"){
    data.push(zone6[index])
    zone6.splice(index,1)
    renderCardSideBar();
    renderCardZone("z6");
    colorCheckZones()
    zoneLocalStorage()
  }
}

function colorCheckZones(){
  if(zone2.length == 0){
    document.querySelector(".div2").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0.427) inset"
  }else{
    document.querySelector(".div2").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0) inset"
  }
  if(zone3.length == 0){
    document.querySelector(".div3").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0.427) inset"
  }else{
    document.querySelector(".div3").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0) inset"
  }
  if(zone4.length == 0){
    document.querySelector(".div4").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0.427) inset"
  }else{
    document.querySelector(".div4").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0) inset"
  }
  if(zone6.length == 0){
    document.querySelector(".div6").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0.427) inset"
  }else{
    document.querySelector(".div6").style.boxShadow="0 0 0 2000px rgba(255, 0, 0, 0) inset"
  }
}

function zoneLocalStorage(){
  localStorage.setItem("myData", JSON.stringify(data));
  localStorage.setItem("zone1Data", JSON.stringify(zone1));
  localStorage.setItem("zone2Data", JSON.stringify(zone2));
  localStorage.setItem("zone3Data", JSON.stringify(zone3));
  localStorage.setItem("zone4Data", JSON.stringify(zone4));
  localStorage.setItem("zone5Data", JSON.stringify(zone5));
  localStorage.setItem("zone6Data", JSON.stringify(zone6));
}

function getZonesData(){
  data = JSON.parse(localStorage.getItem("myData")) || [];
  zone1 = JSON.parse(localStorage.getItem("zone1Data")) || [];
  zone2 = JSON.parse(localStorage.getItem("zone2Data")) || [];
  zone3 = JSON.parse(localStorage.getItem("zone3Data")) || [];
  zone4 = JSON.parse(localStorage.getItem("zone4Data")) || [];
  zone5 = JSON.parse(localStorage.getItem("zone5Data")) || [];
  zone6 = JSON.parse(localStorage.getItem("zone6Data")) || [];
}

// let assigner = document.getElementById("assigner");
// assigner.addEventListener("click", e=>{
//      let email = e.target.parentElement.id
//      let indix = data.findIndex(idx=> email == idx.email)
//      const zones = document.querySelectorAll('.zones')
//      zones.forEach(zone=>{
//       zone.innerHTML = `
//     <article id=${data[indix].email} class="d-flex align-items-center gap-3">
//       <img width="48" height="48" src=${data[indix].photo} alt=${data[indix].nom} class="">
//       <div class="flex-grow-1">
//         <h4>${data[indix].nom}</h4>
//         <p>${data[indix].role}</p>
//       </div>
//       <button id="assigner">Assigner</button>
//     </article>
//   `
//      })

// })


// let zones = document.querySelectorAll(".zones")
// zones.forEach(zone => {
//   // console.log(zone.getAttribute("id"));
//   zone.addEventListener("click", (event) =>{
//     // console.log(event.target.getAttribute("id"));
//     zoneTargeted = event.target.getAttribute("id");
//   })
  
// })

// data-unique = ${objet.email}

// document.querySelectorAll.forEach(btn =>{
//   let email = btn.getAttribute("data-unique")
//   let obj = findByEmail(email)
//   saveToZone(zoneTargeted,obj);
// })

// saveToZone(zone,employe)



// function findByEmail(email){
// DataList.forEach((empl,i) => {
//   if(empl.email == email)
//     DataList.splice(i,1)
//   return empl;
// })

// }



// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// const phoneRegex = /^(\+212|00212|0)[5-7]\d{8}$/
// const nomRegex = /^([A-Z][a-z]*\s*)+$/
// const photoRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:[\/?#]\S*)?$/

// let inputNom = document.getElementById("nom");
// let inputEmail = document.getElementById("email");
// let inputTelephone = document.getElementById("phone");
// let inputPhoto = document.getElementById("photo");
// let checking = true;
// let answer = 0;

// inputNom.addEventListener("blur", () => {
//   if (!nomRegex.test(inputNom.value)) {
//     checking = false;
//     document.getElementById("inputNomMessage").innerHTML = "Format du nom n'est pas valide";
//   }
//   if (inputNom.value == "") {
//     checking = false;
//     document.getElementById("inputNomMessage").innerHTML = "input is empty";
//   }
//   if (nomRegex.test(inputNom.value)) {
//     checking = true;
//     answer = document.getElementById("inputNomMessage").innerHTML = "";
//   } return answer;
// });

// inputEmail.addEventListener("blur", () => {
//   if (!emailRegex.test(inputEmail.value)) {
//     checking = false;
//     document.getElementById("inputEmailMessage").innerHTML = "Format de l'email n'est pas valide";
//   }
//   if (inputEmail.value == "") {
//     checking = false;
//     document.getElementById("inputEmailMessage").innerHTML = "input is empty";
//   }
//   if (emailRegex.test(inputEmail.value)) {
//     checking = true;
//     answer = document.getElementById("inputEmailMessage").innerHTML = "";
//   } return answer;
// });

// inputTelephone.addEventListener("blur", () => {
//   if (!phoneRegex.test(inputTelephone.value)) {
//     checking = false;
//     document.getElementById("inputTeleMessage").innerHTML = "Format du numero de telephone n'est pas valide";
//   }
//   if (inputTelephone.value == "") {
//     checking = false;
//     document.getElementById("inputTeleMessage").innerHTML = "input is empty";
//   }
//   if (phoneRegex.test(inputTelephone.value)) {
//     checking = true;
//     answer = document.getElementById("inputTeleMessage").innerHTML = "";
//   } return answer;
// });

// inputPhoto.addEventListener("blur", () => {
//   if (!photoRegex.test(inputPhoto.value)) {
//     checking = false;
//     document.getElementById("inputPhotoMessage").innerHTML = "Format de la photo n'est pas valide";
//   }
//   if (inputPhoto.value == "") {
//     checking = false;
//     document.getElementById("inputPhotoMessage").innerHTML = "input is empty";
//   }
//   if (photoRegex.test(inputPhoto.value)) {
//     checking = true;
//     answer = document.getElementById("inputPhotoMessage").innerHTML = "";
//   } return answer;
// });

// answer++;

// form.addEventListener("submit", (event) => {
//   if (!answer == (answer.innerHTML = ""))
//     event.preventDefault();
//   else {

//   }
//   // console.log(checking);
// });

