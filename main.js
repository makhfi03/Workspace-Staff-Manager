let zoneTargeted = "";
let data = JSON.parse(localStorage.getItem("myData")) || [];

data.forEach(d=>{
  renderCard(d)
})

let form = document.forms["ajouterWorker"];
let employeContainer = document.getElementById("dynamiqueForm");
let afficherProfil = document.getElementById("affichProfil");

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
  `
});
 
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
    console.log(i);
    
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
  `
    })
  })
}

function createCard(objet) {
  let cards = "";
  cards += `
              <div class="card-body row d-flex justify-content-center" id="card-list" email="${objet.email}">
                <div class="col-12 col-md-12 d-flex justify-content-center w-25" id="img">
                  <img src="${objet.photo}" class="img-thumbnail background-sizi" alt="...">
                </div>
                <div class="col-12 col-md-12">
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
return cards
}

document.querySelectorAll(`[data-bs-target="#showEmployes"]`).forEach(btn=>{
  btn.addEventListener("click",e=>{    
    let html = "" ;
    html +=  data.map(e=>`${createRoomCard(e)}`).join("");
    document.querySelector("#showEmployesBody").innerHTML = html
})

})

function createRoomCard(staff){
  return `
    <article id=${staff.email} class="d-flex align-items-center gap-3">
      <img width="48" height="48" src=${staff.photo} alt=${staff.nom} class="">
      <div class="flex-grow-1">
        <h4>${staff.nom}</h4>
        <p>${staff.role}</p>
      </div>
      <button id="assigner">Assigner</button>
    </article>
  `
}

let assigner = document.getElementById("assigner");
assigner.addEventListener("click", e=>{
     let email = e.target.parentElement.id
     obje

})


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

