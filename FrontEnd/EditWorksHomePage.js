/*récupération des projets dans l'api avec la méthode fetch et désérialisation */
const works = await fetch("http://localhost:5678/api/works");
const projects = await works.json();

/* création d'une fonction avec le tableau projects comme argument pour afficher dans le dom les projets récupérés dans les ligne 2 et3  */
function generateProjects(projects) {
  /*création d'une boucle et d'une variable "article"
   * Pour chaque itération de la boucle l'objet actuel sera stocké sur "article"
   */
  for (let i = 0; i < projects.length; i++) {
    const article = projects[i];
    /* récupération de la balise html qui servira à recevoir les projets*/
    const filesSection = document.querySelector(".sheets-projects");
    /* création d'un balise article qui servira de parent pour l'image et la légende */
    const projectElement = document.createElement("article");
    /** attricution d'un id à la balise article */
    projectElement.setAttribute("data-id", article.id);
    /*création des balises img et p pour recevoir l'image et la légende */
    const pictureElement = document.createElement("img");
    pictureElement.src = article.imageUrl;
    const nameElement = document.createElement("p");
    nameElement.innerText = article.title;
    /**rattachement de la balise "article" à la balise "sheets-projects"
     * et rattachement de l'image et la légende à la balise "article"
     */
    filesSection.appendChild(projectElement);
    projectElement.appendChild(pictureElement);
    projectElement.appendChild(nameElement);
  }
}
/**appel de la fonction */
generateProjects(projects);

/**récupération de la balise html ".flt-all*/
const buttonAll = document.querySelector(".flt-all");
/**Ajout d'un écouteur d'événement de clic sur le bouton de la balise ".flt-all" */
buttonAll.addEventListener("click", function () {
  /**filtrage sans condition des projets pour tous les retourner */
  const originalList = projects.filter(function (projects) {
    return projects;
  });
  /** suppression de tout les éléments dans la balise ".sheets-projects"  */
  document.querySelector(".sheets-projects").innerHTML = "";
  /*appelle de la fonction du départ avec comme parametres la liste filtée qu'on a stoqué dans "orinalList" (lg.39) */
  generateProjects(originalList);
});

/**même méthode mais au lieu d'avoir un filtrage sans condition
 * on demande de retourner tout les projets qui ont "objects" comme nom de "category"
 */
const buttonObjects = document.querySelector(".flt-object");
buttonObjects.addEventListener("click", function () {
  const filteredList = projects.filter(function (projects) {
    return projects.category.name === "Objets";
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(filteredList);
});

const buttonApartment = document.querySelector(".flt-apart");
buttonApartment.addEventListener("click", function () {
  const filteredList = projects.filter(function (projects) {
    return projects.category.name === "Appartements";
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(filteredList);
});

const buttonHotelRestau = document.querySelector(".flt-hotel-restau");
buttonHotelRestau.addEventListener("click", function () {
  const filteredList = projects.filter(function (projects) {
    return projects.category.name === "Hotels & restaurants";
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(filteredList);
});

