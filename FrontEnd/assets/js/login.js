
const formInfos = document.querySelector("#form1");

formInfos.addEventListener("submit", async function (event) {  
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#rmdp").value;
 
  const userInfos = { email, password };  
  event.preventDefault();

  const authInfos = await fetch(
    "http://localhost:5678/api/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfos),
    }
  );
  const authResponse = await authInfos.json();
  const authToken = authResponse.token;

  // Si connecté alors
  if (authToken) {
    sessionStorage.setItem("authToken", authToken);
    window.location.replace("index.html");
  } 
  else {
    const errorUserNotification = document.querySelector(".errorUserNotification");
    errorUserNotification.innerText = "Champs incorrects.";
    errorUserNotification.style.color = "red";
  }
});