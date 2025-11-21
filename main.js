let form = document.forms["ajouterWorker"];
let employeContainer = document.getElementById("dynamiqueForm");

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
  renderCard(objet);
  console.log(objet);

  for (let i = 0; i < form.name.length; i++)
    objet.dynamiqueForm.push(
      {
        name: form.name[i].value,
        roleEntreprise: form.roleEntreprise[i].value
      }
    );
});

function renderCard(objet) {
  let cardlist = document.getElementById("card-sidebar");
  let card = document.createElement('div');
  card.innerHTML += createCard(objet);
  cardlist.appendChild(card);
}

function createCard(objet) {
  let cards = "";
  cards += `
<div class="card-body row d-flex justify-content-center" id="card-list">
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
                  <div class="w-100" id="edit">
                    <button email="" class="btn btn-primary w-100 m-2 edit" type="button" 
                    data-toggle="modal" data-target="#exampleModalCenter">Modifier</button>
                  </div>
                </div>
                 </div>
`;
  return cards;
}

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




// const form = document.getElementById("addBtn")
// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   const formDataObject = {
//     nom: document.getElementById('nom').value,
//     role: document.getElementById('role').value,
//     email: document.getElementById('email').value,
//     telephone: document.getElementById('phone').value,
//     photo: document.getElementById('photo').value
//   };

//   localStorage.setItem('donneesFormulaire', JSON.stringify(formDataObject));

//   console.log('Données sauvegardées dans localStorage.');
// });

// function chargerDonnees() {
//   const donneesStockees = localStorage.getItem('donneesFormulaire');
//   if (donneesStockees) {
//     const donnees = JSON.parse(donneesStockees);
//     document.getElementById('nom').value = donnees.nom;
//     document.getElementById('role').value = donnees.role;
//     document.getElementById('email').value = donnees.email;
//     document.getElementById('phone').value = donnees.phone;
//     document.getElementById('photo').value = donnees.photo;
//   }
// }

