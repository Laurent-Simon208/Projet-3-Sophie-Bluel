/*récupération des projets dans l'api avec la méthode fetch et désérialisation */
const works = await fetch("http://localhost:5678/api/works");
const projects = await works.json();

/**création d'un fonction pour afficher les projets de l'api */
function generateProjects(projects) {
  /**création d'une boucle qui a pour but de créer pour chaque projet un "article" dans le dom 
   * et l'afficher dans la balise "sheets-projects" dédiée à ça dans le html
   */
  for (let i = 0; i < projects.length; i++) {
    const article = projects[i];
    const filesSection = document.querySelector(".sheets-projects");
    const projectElement = document.createElement("article");
    projectElement.setAttribute("data-id", article.id);
    const pictureElement = document.createElement("img");
    pictureElement.src = article.imageUrl;
    const nameElement = document.createElement("p");
    nameElement.innerText = article.title;
    filesSection.appendChild(projectElement);
    projectElement.appendChild(pictureElement);
    projectElement.appendChild(nameElement);
  }
}
/**appel de la fonction */
generateProjects(projects);

/**creation du filtre pour afficher tous les projets */
const buttonAll = document.querySelector(".flt-all");
buttonAll.addEventListener("click", function () {
  const originalList = projects.filter(function (projects) {
    return projects;
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(originalList);
});
/**creation du filtre pour afficher les projets avec "objets" comme catégorie */
const buttonObjects = document.querySelector(".flt-object");
buttonObjects.addEventListener("click", function () {
  const filteredList = projects.filter(function (projects) {
    return projects.category.name === "Objets";
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(filteredList);
});
/**creation du filtre pour afficher les projets avec "appartements" comme catégorie */
const buttonApartment = document.querySelector(".flt-apart");
buttonApartment.addEventListener("click", function () {
  const filteredList = projects.filter(function (projects) {
    return projects.category.name === "Appartements";
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(filteredList);
});
/**creation du filtre pour afficher les projets avec "hotel & restaurant" comme catégorie */
const buttonHotelRestau = document.querySelector(".flt-hotel-restau");
buttonHotelRestau.addEventListener("click", function () {
  const filteredList = projects.filter(function (projects) {
    return projects.category.name === "Hotels & restaurants";
  });
  document.querySelector(".sheets-projects").innerHTML = "";
  generateProjects(filteredList);
});

