const gallery = document.querySelector(".gallery"); 
const gallerydiv = document.querySelectorAll("gallery > div");
const btn = document.getElementsByClassName("button");
const filters = document.querySelector(".filters");
const btnchanges = document.querySelector(".changes");
const modaldisplaying = document.querySelector(".modaldisplay"); 





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
    console.log(works);
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
  deleteProject();
}

projetModal();










window.onload = () => {
    let filters = document.querySelectorAll(".filters div");

    for(let filter of filters){
        filter.addEventListener("click", function(){
            let tag = this.id;

            let images = document.querySelectorAll("img");

            for(let image of images){
                image.classList.replace("active", "inactive");

                if(tag in image.dataset || tag ==="tous"){
                    image.classList.replace("inactive", "active")
                }
            }

            let figcaptions = document.querySelectorAll(".gallery figcaption");

            for(let figcaption of figcaptions){
                figcaption.classList.replace("active", "inactive");

                if(tag in figcaption.dataset || tag ==="tous"){
                    figcaption.classList.replace("inactive", "active")
                }
            }
        });
    }


}
