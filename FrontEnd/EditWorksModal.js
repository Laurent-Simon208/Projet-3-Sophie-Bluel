/**récupération du token */
const tokenVerification = localStorage.getItem("token");
/**rattachement aux balises html */
const publishChangment = document.querySelector("#publish-changment");
const publishPicture = document.querySelector(".modification-picture");
const publishProject = document.querySelector(".modification-project");
const h2Projects = document.querySelector("#h2-projects");
const filterProject = document.querySelector(".filters-projects");
const buttonLogin = document.querySelector("#js-login");
const buttonLogout = document.querySelector("#js-logout");
/**condition pour afficher et effacer certains éléments du dom s'il y a le token sur le local storage */
if (tokenVerification) {
  filterProject.style.display = "none";
  h2Projects.style.display = "none";
  buttonLogin.style.display = "none";
  buttonLogout.style.display = null;
} else {
  publishChangment.style.display = "none";
  publishPicture.style.display = "none";
  publishProject.style.display = "none";
}
/**création d'un événement click pour se déconnecter et donc supprimer le token du local storage */
buttonLogout.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

let modal = null;
/**creation de la fonction pour ouvrir la modale "modifer"*/
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector("#js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};
/**créationde de la fonction pour fermer la modale */
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector("#js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

/**récupération des projets depuis l'api*/
const worksModal = await fetch("http://localhost:5678/api/works");
const projectsModal = await worksModal.json();
/**génération de l'affichage des projets dans la modale */
function generateProjectsModal(projectsModal) {
  for (let i = 0; i < projectsModal.length; i++) {
    const articleMod = projectsModal[i];
    const filesSectionMod = document.querySelector(".sheets-modal");
    const cardElement = document.createElement("article");
    cardElement.setAttribute("card-element-data-id", articleMod.id);
    const legendCard = document.createElement("p");
    legendCard.innerText = "éditer";
    const pictureCard = document.createElement("img");
    pictureCard.src = articleMod.imageUrl;
    const deleteCard = document.createElement("button");
    deleteCard.classList.add("buttonBin");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash-can");

    filesSectionMod.appendChild(cardElement);
    cardElement.appendChild(pictureCard);
    cardElement.appendChild(legendCard);
    cardElement.appendChild(deleteCard);
    deleteCard.appendChild(icon);
    /**récupération de l'id des articles */
    const dataIdMod = articleMod.id;
    /**suppression dans l'api */
    function deleteProject(dataIdMod) {
      fetch(`http://localhost:5678/api/works/${dataIdMod}`, {
        method: "delete",
        headers: {
          authorization: `Bearer ${tokenVerification}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Le projet ${dataIdMod} a été supprimé avec succès.`);
          } else {
            console.error(`La suppression du projet ${dataIdMod} a échoué`);
          }
        })
        .catch((error) => {
          console.error(
            `Une erreur s'est produite lors de la suppression du projet ${dataIdMod}`
          );
        });
    }
    /**suppression dans le dom */
    deleteCard.addEventListener("click", function () {
      deleteProject(dataIdMod);
      console.log(dataIdMod);
      const projectElementDelete = document.querySelector(
        `[data-id="${dataIdMod}"]`
      );
      const cardElementDelete = document.querySelector(
        `[card-element-data-id="${dataIdMod}"]`
      );
      projectElementDelete.remove();
      cardElementDelete.remove();
      console.log(projectElementDelete, cardElementDelete);
    });
  }
}
/**appel de la fonction */
generateProjectsModal(projectsModal);
