async function principale() {
    const categorie = await getCategorieApi();
    const email = "sophie.bluel@test.tld";
    const password = "S0phie";

    const login = await postLoginApi(email, password);
    const token = login.token;
    console.log(token);
    sessionStorage.setItem('token', token);

}


async function getCategorieApi() {
    const req = await fetch("http://localhost:5678/api/categories");
    const res = await req.json();
    return res;   
}

async function postLoginApi(email, password) {
    const req = await fetch("http://localhost:5678/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    const res = await req.json();
    return res;   
}

principale();


window.onload = () => {
    let filters = document.querySelectorAll(".filters div");

    for(let filter of filters){
        filter.addEventListener("click", function(){
            let tag = this.id;

            let images = document.querySelectorAll(".gallery img");

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
