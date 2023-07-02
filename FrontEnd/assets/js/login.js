

const gallery = document.querySelector(".gallery")
const gallerieTous = document.querySelectorAll("gallery > div");
const btn = document.getElementsByClassName("button");



/* Appel des catégories et des projets */

async function getCategorieApi() {
    const req = await fetch("http://localhost:5678/api/categories");
    const res = await req.json();
    return res;  
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
