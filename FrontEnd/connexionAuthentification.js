/**création de la modal d'erreur */
const modalConnexion = document.querySelector("#modal-connexion");
const btnClose = document.querySelector(".js-modal-stop");
function openModal() {
  modalConnexion.style.display = "flex";
}
function closeModal() {
  modalConnexion.style.display = "none";
}
btnClose.addEventListener("click", function () {
  closeModal();
});
window.onclick = function (e) {
  if (e.target == modalConnexion) {
    modalConnexion.style.display = "none";
  }
};

/**récupération de la balise html */
const userLogin = document.querySelector("#user-login");

/**ajout d'un événement pour récuperer les données entrées dans le formulaire*/
userLogin.addEventListener("submit", async function (e) {
  e.preventDefault();
  const mailLogin = e.target.querySelector("#e-mail").value;
  const passwordLogin = e.target.querySelector("#password").value;
  /**Lors de notre discussion je n'ai pas précisé que dans le formulaire il s'agissait d'un type "email" il demande donc déjà la présence d'un "@"*/
    const loginBody = {
      email: mailLogin,
      password: passwordLogin,
    };
    const payLoad = JSON.stringify(loginBody);
    /**utilisation de l'objet pour envoyer une requête POST à l'api */
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: payLoad,
      headers: {
        "Content-Type": "application/json",
      },
    })
      /**gestion de la reponse envoyée par l'api */
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          openModal();
          throw new Error("Response not ok");
        }
      })
      .then(function (data) {
        /**si la réponse de la requête est positive récupération et stockage du token dans le localstorage */
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      })
      .catch(function (error) {
        console.error(error);
      });
});
