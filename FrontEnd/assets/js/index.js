const gallery = document.querySelector(".gallery"); 
const gallerydiv = document.querySelectorAll("gallery > div");
const btn = document.getElementsByClassName("button");
const filters = document.querySelector(".filters");
const btnchanges = document.querySelector(".changes");
const modaldisplaying = document.querySelector(".modaldisplay"); 
const portfolio = document.getElementById("portfolio");




const CatAll = document.createElement("button");
CatAll.setAttribute("categoryId", "0");
CatAll.setAttribute("class", "button");
CatAll.innerText = "Tous";
CatAll.addEventListener("click", () => {
    gallerydiv.forEach((div) => (div.style.display = "block"));
});
filters.appendChild(CatAll);



async function button() {
    const filtersbtn = await getCategorieApi();
    filtersbtn.forEach((btn) => {
        const filtersbtns = document.createElement("button");
        filtersbtns.setAttribute("categoryId", btn.id);
        filtersbtns.setAttribute("class" , "button");
        filtersbtns.innerText = btn.name;
        filters.appendChild(filtersbtns);
    });
}

button();






/* Appel des catégories et des projets */

async function getCategorieApi() {
    const req = await fetch("http://localhost:5678/api/categories");
    const categories = await req.json();
    return categories;
}

async function getWorksApi() {
    const req = await fetch("http://localhost:5678/api/works");
    const works = await req.json();
    return works;
}


/* Affichage des projets */

async function Projets() {
    const dataProjets = await getWorksApi();
    dataProjets.forEach((galleryImg) => {
        const imgProjet = document.createElement("div");
        const imgSoB = document.createElement("img");
        const titleso = document.createElement("h3");
        imgSoB.src = galleryImg.imageUrl;
        titleso.innerText = galleryImg.title;
        imgProjet.appendChild(imgSoB);
        imgProjet.appendChild(titleso);
        gallery.appendChild(imgProjet);       
    });
}

Projets(); 


async function filtersforworks() {
    const workfilters = await getWorksApi();
    const catfilters = await getCategorieApi();
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", () => {
        console.log(btn[i]);
        let ctgId = btn[i].getAttribute("categoryId");
        console.log(ctgId);
        if (ctgId == 0) {
          gallery.innerHTML = "";
          Projets();
        } else {
          gallery.innerHTML = "";
          workfilters.forEach((galleryImg) => {
            if (galleryImg.categoryId == ctgId) {
              const imgProjet = document.createElement("div");
              const imgSoB = document.createElement("img");
              const titleso = document.createElement("h3");
              imgSoB.src = galleryImg.imageUrl;
              titleso.innerText = galleryImg.title;
              imgProjet.appendChild(imgSoB);
              imgProjet.appendChild(titleso);
              gallery.appendChild(imgProjet);
            }
          });
        }
      });
    }
  }
  
  filtersforworks();



/* Mode édition après login */

function displayEditMod() {
 
    const authState = sessionStorage.getItem("authState");
  

    if (authState === "true") {
      console.log("Vous êtes connecté"); 
      btnchanges.style.setProperty("display", "flex");
      document.getElementById("login").style.display = "none";
      filters.style.setProperty("display", "none");
    } else {
      console.log("Vous êtes déconnecté"); 
  }
 }
  
  displayEditMod(); 
  
 

    btnchanges.addEventListener("click", () => {
        modaldisplaying.style.setProperty("display", "flex");   
    })







/* Ouverture de la première modale*/


let modal1 = null; 
let previousModal = null;

function openModal() {
  const modalOpen = document.querySelector(e.target.getAttribute("href"));
  console.log(modalOpen);
  previousModal = modal1;
  modalOpen.style.display = "flex";
  modaldisplay.style.setProperty("display", "flex");
  modal1 = modalOpen;
  modal1.addEventListener("click", closeModal);
  modal1.querySelector(".js-close-modal").addEventListener("click", closeModal);
  modal1
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

document.querySelectorAll("modal1js").forEach((a) => {
    a.addEventListener("click", openModal);
  });


/* Fermer la modale */ 

const clsmdlbtn = document.querySelectorAll(".clsmodalbtn");
const modaldeux = document.querySelector("#modal2")

for (let i = 0; i < clsmdlbtn.length; i++) {
    clsmdlbtn[i].addEventListener("click", function () {
      modaldisplaying.style.display = "none";
      modaldeux.style.display= "none";
    });
  }











/* Affichage de la galerie dans la modale  */

const ModalGalery = document.querySelector("#modalgalery");

async function projetModal() {
  const glrymodalAPI = await getWorksApi();
  console.log(glrymodalAPI);
  glrymodalAPI.forEach((glrymodalIMG) => {
    const imgProjet = document.createElement("div");
    const imgContainer = document.createElement("div");
    const imgSophie = document.createElement("img");
    const titleEditer = document.createElement("div");
    const trashIcon = document.createElement("i");
    const sqrIcon = document.createElement("i");
    const sqriconbox = document.createElement("div");
    const sqrIcon2 = document.createElement("i");
    const sqriconbox2 = document.createElement("div");
    const trashIconBox = document.createElement("div");
    const arrowFour = document.createElement("i");
    const arrowFourBox = document.createElement("div");
    imgSophie.src = glrymodalIMG.imageUrl;
    titleEditer.textContent = "éditer";
    titleEditer.className = "edittxt";
    trashIcon.className = "fa-solid fa-trash-can";
    sqrIcon.className = "fa-solid fa-square";
    sqriconbox.className = "sqr-box";
    sqrIcon2.className = "fa-solid fa-square";
    sqriconbox2.className = "sqr-box2";
    trashIconBox.className = "box-trash";
    arrowFour.className = "fa-solid fa-arrows-up-down-left-right";
    arrowFourBox.className = "box-arrow";
    imgProjet.className = "IMGProjet";
    
    trashIconBox.appendChild(trashIcon);
    imgContainer.appendChild(imgSophie);
    imgContainer.appendChild(trashIconBox);
    arrowFourBox.appendChild(arrowFour);
    sqriconbox.appendChild(sqrIcon);
    imgContainer.appendChild(sqriconbox);
    sqriconbox2.appendChild(sqrIcon2);
    imgContainer.appendChild(sqriconbox2);
    imgContainer.appendChild(arrowFourBox);
    imgProjet.appendChild(imgContainer);
    imgProjet.appendChild(titleEditer);
    trashIconBox.setAttribute("id", glrymodalIMG.id);
    console.log(glrymodalIMG.id);
    ModalGalery.appendChild(imgProjet);
    imgContainer.className = "img-container";

   
  });

  deletefct();
}


projetModal();


/* Alternance modal1 à modal2 */


const firstmodal = document.querySelector("#modal1");
const scdmodal = document.querySelector("#modal2");
const btnmdl1to2 = document.querySelector(".modaljs2");

function AppOfMdl2() {
    btnmdl1to2.addEventListener("click", function () {
    scdmodal.style.display = "flex";
    firstmodal.style.display = "none";
  });
}

AppOfMdl2();



/* Icône de suppression */











  

    



const authToken = sessionStorage.getItem("authToken");
console.log(authToken);

const deletebtn = document.querySelectorAll(".box-trash");
console.log(deletebtn);



function deletefct(id) {
  const authToken = sessionStorage.getItem("authToken");
console.log(authToken);

const deletebtn = document.querySelectorAll(".box-trash");
console.log(deletebtn);
  deletebtn.forEach((icon) => {
    icon.addEventListener("click", function (event) {
      event.preventDefault();
      const id = icon.getAttribute("id");
      try {
        const response =  fetch("http://localhost:5678/api/works/" + id, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${authToken}`
          },
        });
        if (response) {
          console.log("Projet supprimé avec succès.");
          location.reload();
        } else if (response.status === 401) {
          console.error("Non autorisé à effectuer cette action.");
        } else {
          console.error(
            "Erreur lors de la suppression du projet:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    });
  });
}




/* Ajout d'un fichier sur la modale 2 */

/* --> Afficher l'image sélectionnée */ 


const inputAddImage = document.querySelector("#inputAddImage");

inputAddImage.addEventListener("change", function () {
  // Si la taille du fichier est <= à 4 Mo
  if (inputAddImage.files[0].size <= 4 * 1024 * 1024) {
    // Réinitialisation de la zone "project-photo-file-add-container" du DOM
    const addimageboxxx = document.querySelector (".addimagebox");
    // Vide le "containerInputAddImg" pour afficher l'image sélectionner (preview)
    addimageboxxx.innerHTML = "";
    // Création d'une balise "img"
    const previewImg = document.createElement("img");
    // Création d'un objet URL à partir de la "src" sélectionner
    previewImg.src = URL.createObjectURL(inputAddImage.files[0]);
    // "modalPreviewImg" enfant de "containerInputAddImg"
    addimageboxxx.appendChild(previewImg);
    // Permet de choisir une nouvelle image au clique sur le "preview"
    previewImg.addEventListener("click", function () {
      inputAddImage.click();
    });
  } else {
    inputAddImage.value = "";
    return alert("La taille de l'image ne doit pas être supérieure à 4mo.");
  }
});


const listeDeroul = document.querySelector("select");

async function modalDeuxCategorie() {
    const categoriesModale = await getCategorieApi();
    categoriesModale.forEach((modalCategorie) => {
      const elementListe = document.createElement("option");
      elementListe.innerText = modalCategorie.name;
      elementListe.setAttribute("value", modalCategorie.id);
      listeDeroul.appendChild(elementListe);
    });
  }

modalDeuxCategorie();

/* Validation du formulaire */ 

// Récupération des deux "input" et du buton "Valider"
// const inputAddImage = document.querySelector("#inputAddImage");
const workTitle = document.querySelector("#workTitle");
const workCategory = document.querySelector("#categoryListModale");
const btnforvalid = document.querySelector(".valid-ajout-photo");

// Si les 3 inputs ont une valeurs alors affiche le btn "validForm" en vert
function checkInputs() {
  if (inputAddImage.value && workTitle.value && workCategory.value) {
    btnforvalid.classList.add("valid");
  } else {
    btnforvalid.classList.remove("valid");
  }
}

inputAddImage.addEventListener("input", checkInputs);
workTitle.addEventListener("input", checkInputs);
workCategory.addEventListener("input", checkInputs);

// Au clique sur le bouton "Valider" du "modalForm"
btnforvalid.addEventListener("click", function (event) {
  event.preventDefault();
  // Si les 3 champs sont remplis
  if (
    inputAddImage.checkValidity() &&
    workTitle.checkValidity() &&
    workCategory.checkValidity() === true
  ) {
    // Appel de la fonction pour ajouter un projet
    addWork();
  } else {
    // Récupération de la class "errorAddWork"
    const errorAddWork = document.querySelector(".errorAddWork");
    errorAddWork.innerText = "Tout les champs sont requis"; // Message d'erreur
    errorAddWork.style.color = "red";
  }
});




  const previewImg = document.querySelector(".preview-img");

  async function addWork() {
    // Création d'un nouvel objet "FormData" pour stocker les données du formulaire
    
  
    // Ajoute le fichier sélectionné "inputAddImage" au "formData"
    const formData = new FormData();

  // Ajoute le fichier sélectionné "inputAddImage" au "formData"
  formData.append("image", inputAddImage.files[0]);
  // Ajoute la valeur saisie "workTitle" au "formData"
  formData.append("title", workTitle.value);
  // Ajoute la valeur "workCategory" choisie au "formData"
  formData.append("category", workCategory.value);


    const addResponse =  await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: { "Authorization": `Bearer ${authToken}` , },

      body: formData
    });
  
    // Si réponse "ok" alors on ajoute le projet au DOM
    if (addResponse) {
        console.log("ajouté(e)");
        

    } else {
      return alert("Échec de la l'ajout du projet");
    }
  }