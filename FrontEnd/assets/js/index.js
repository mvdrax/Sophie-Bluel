const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const btnchanges = document.querySelector(".changes");

const authToken = sessionStorage.getItem("authToken");

if (authToken) {
  btnchanges.style.setProperty("display", "flex");
  document.getElementById("login").style.display = "none";
  // filters.style.setProperty("display", "none");
}

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

// Function principale

async function main() {
  const works = await getWorksApi();

  createWorks(works);
  createFilters();
}
main();

// Fonctions pour ajouter les figures et les filtres

async function createWorks(works) {
  for (let element of works) {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${element.imageUrl}">
      <figcaption>${element.title}</figcaption>
    `;
    gallery.appendChild(figure);
  }
}

async function createFilters() {
  const works = await getWorksApi();
  const categories = await getCategorieApi();

  const btnAll = document.createElement("button");
  btnAll.textContent = "Tous";
  filters.appendChild(btnAll);

  for (let element of categories) {
    const btn = document.createElement("button");
    btn.textContent = element.name;
    filters.appendChild(btn);
  }

  const btnFilters = document.querySelectorAll(".filters button");

  for (let i = 0; i < btnFilters.length; i++) {
    btnFilters[i].addEventListener("click", () => {
      gallery.innerHTML = "";

      if (i === 0) {
        createWorks(works);
        return;
      }

      const newData = works.filter((data) => {
        return data.categoryId === i;
      });
      createWorks(newData);
    });
  }
}

const btnOpenModal = document.querySelector(".modal1js");
const glrModal = document.querySelector("#modalgalery");
const btnModal1 = document.querySelector(".btnmodal1");
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');

btnOpenModal.addEventListener("click", function () {
  gestionModal1();
});

async function gestionModal1() {
  const works = await getWorksApi();
  modal1.style.display = "flex";
  glrModal.innerHTML = "";

  for (element of works) {
    const figure = document.createElement("figure");
    figure.className = "img-container";
    figure.innerHTML = `
        <button value="${element.id}"><i class="fas fa-trash"></i></button>
        <img src="${element.imageUrl}">
        <p>éditer</p>
      `;
    glrModal.appendChild(figure);
  }

  const btnDeleteFigure = document.querySelectorAll(".img-container button");
  for (let btn of btnDeleteFigure) {
    btn.addEventListener('click', async function () {
      const id = btn.value;
      const req = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { "authorization": `Bearer ${authToken}` }
      });
      const res = await req.json();

      if (res) {
        gestionModal1();
      }
    });
  }

  btnModal1.addEventListener("click", () => {
    modal1.style.display = "none";
    modal2.style.display = "flex";

    gestionModal2();
  })
}

async function gestionModal2() {
  const inputFile = document.querySelector(".box-modal2 input[type=file]");
  const inputCategory = document.querySelector(".box-modal2 input[type=text]");
  const select = document.querySelector(".box-modal2 select");

  const categories = await getCategorieApi();

  for (let element of categories) {
    const option = document.createElement("option");
    option.innerText = element.name;
    option.value = element.id;

    select.appendChild(option);
  }

  const btnAddNewFigure = document.querySelector("#validerButton");

  btnAddNewFigure.addEventListener("click", async function (event) {
    event.preventDefault();
    addNewFigure();
  })
}

async function addNewFigure() {
  const img = document.querySelector(".box-modal2 input[type=file]").files[0];
  const title = document.querySelector(".box-modal2 input[type=text]").value;
  const category = document.querySelector(".box-modal2 select").value;

  if (!img || title === "" || category === "") {    
    return;
  }

  const formulaire = new FormData();
  formulaire.append("image", img);
  formulaire.append("title", title);
  formulaire.append("category", parseInt(category));

  const req = await fetch(`http://localhost:5678/api/works`, {
    method: "POST", 
    headers: { "authorization": `Bearer ${authToken}` },
    body: formulaire
  });
  const res = req.json();

  if (res) {
    location.reload();
  }
}

const btnCloseModal = document.querySelectorAll(".clsmdlbtn");

for (let btn of btnCloseModal) {
  btn.addEventListener("click", function () {
    modal1.style.display = "none";
    modal2.style.display = "none";
  });
}