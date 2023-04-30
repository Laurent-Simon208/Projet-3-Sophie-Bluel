/**récuperation de la balise html */
const userLogin = document.querySelector("#user-login");

/**création d'un événement "submit" pour soumettre le formulaire  */
userLogin.addEventListener("submit", async function (e) {
  e.preventDefault();
  /**récuperation des valeures rentrées dans le formulaire */
  const mailLogin = e.target.querySelector("#e-mail").value;
  const passwordLogin = e.target.querySelector("#password").value;
  /**création d'un objet avec ces valeures  */
  const loginBody = {
    email: mailLogin,
    password: passwordLogin,
  };
  /**conversion de l'objet en format JSON et stockage dans la constante "payLoad" */
  const payLoad = JSON.stringify(loginBody);
  /**requête de type POST à l'api avec comme body, l'email et le mot de passe */
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: payLoad,
    headers: {
      "Content-Type": "application/json",
    },
  })
    /**récupération et traitement de la réponse donnée par l'api sous forme de promesse*/
    .then(function (response) {
      /**récupération de 2 balises html qui servirons à faire apparaitre
       * une modale en cas d'erreur et un bouton pour fermer cette modale
       */
      const modalConnexion = document.querySelector("#modal-connexion");
      const btnClose = document.querySelector(".js-modal-stop");
      /**création de la fonction pour ouvrir la modale
       * ici j'utilise du css pour la faire apparaitre
       */
      function openModal() {
        modalConnexion.style.display = "flex";
      }
      /**création de la fonction pour fermer la modale */
      function closeModal() {
        modalConnexion.style.display = "none";
      }
      /**création d'un evenement clic pour fermer la modale en appuyant sur un bouton*/
      btnClose.addEventListener("click", function () {
        closeModal();
      });
      /**création de la possibilité de fermer la modale en cliquant en dehors de celle-ci */
      window.onclick = function (e) {
        if (e.target == modalConnexion) {
          modalConnexion.style.display = "none";
        }
      };
      /**condition pour savoir si la réponse de l'api est positive
       * si c'est le cas la promesse retourne la réponse au format json
       * sinon elle ouvre la modale avec le message d'erreur
       */
      if (response.ok) {
        return response.json();     
      } else {
        openModal();
        throw new Error("Response not ok");
      }
    })
    /**si la réponse est positive le token est stoqué dans le local storage 
     * et nous somme renvoyé vers la page d'acceuil
     */
    .then(function (data) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    })
    .catch(function (error) {
      console.error(error);
    });
});
