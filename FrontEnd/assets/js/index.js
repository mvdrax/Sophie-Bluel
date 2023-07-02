const connexion = document.querySelector('#btn_connexion');
console.log (connexion)

connexion.addEventListener("click", (e) => {
    e.preventDefault();


const email = document.querySelector('#email').value;
const password= document.querySelector('#rmdp').value;
console.log(email)
console.log(password)

fetch("http://localhost:5678/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email, password 
        })
})
.then(response => {
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error('Identifiant ou mot de passe incorrect')
    }
})
.then(data => {
    localStorage.setItem("token", data.token);
    window.location.href="index.html"
})



});
