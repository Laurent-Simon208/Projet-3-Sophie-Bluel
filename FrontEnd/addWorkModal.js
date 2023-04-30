const btnAddPicture = document.querySelector("#send-picture");
const tokenVerification = localStorage.getItem("token");

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector("#js-modal2-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop2")
    .addEventListener("click", stopPropagation);
};
/**créationde de la fonction pour fermer la modale */
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  resetForm();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector("#js-modal2-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop2")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};
document.querySelectorAll("#send-picture").forEach((a) => {
  a.addEventListener("click", openModal);
});

const resetForm = function () {
  formSendProject.reset();
  previewImage.src = "";
  previewImage.style.display = "none";
  iconSendPicture.style.display = null;
  buttonAddPicture.style.display = null;
  textSendPicure.style.display = null;
};

const formSendProject = document.querySelector("#form-send-project");
const addPicture = document.querySelector("#add-picture");
const titlePicture = document.querySelector("#title-picture");
const categoryPicture = document.querySelector("#category");
const buttonAddPicture = document.querySelector("#button-send-picture");
const iconSendPicture = document.querySelector("#icon-send-picture");
const textSendPicure = document.querySelector("#p-send-picture");
const validateBtn = document.querySelector("#validate-btn");

titlePicture.addEventListener("input", function () {
  if (
    titlePicture.value &&
    addPicture.files.length > 0 &&
    categoryPicture.value !== ""
  ) {
    validateBtn.style.backgroundColor = "#1D6154";
  }
});

addPicture.addEventListener("change", function () {
  if (titlePicture.value && addPicture.files.length > 0) {
    validateBtn.style.backgroundColor = "#1D6154";
  }
});

buttonAddPicture.addEventListener("click", function (e) {
  e.preventDefault();
  addPicture.click();
});

const previewImage = document.querySelector("#preview-image");

addPicture.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      previewImage.src = reader.result;
    },
    false
  );

  if (file) {
    previewImage.style.display = null;
    iconSendPicture.style.display = "none";
    buttonAddPicture.style.display = "none";
    textSendPicure.style.display = "none";
    reader.readAsDataURL(file);
  }
});

formSendProject.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", addPicture.files[0]);
  formData.append("title", titlePicture.value);
  formData.append("category", categoryPicture.value);

  if (
    addPicture.files.length === 0 ||
    titlePicture.value === "" ||
    categoryPicture.value === ""
  ) {
    console.log("erreur");
    openModalErrorText();
    return;
  } else {
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${tokenVerification}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        formSendProject.reset();
        previewImage.src = "";
        previewImage.style.display = "none";
        iconSendPicture.style.display = null;
        buttonAddPicture.style.display = null;
        textSendPicure.style.display = null;
        console.log(data.imageUrl);

        function addProjectWork(data) {
          const filesSection = document.querySelector(".sheets-projects");

          const projectElement = document.createElement("article");

          const pictureElement = document.createElement("img");
          pictureElement.src = data.imageUrl;

          const nameElement = document.createElement("p");
          nameElement.innerText = data.title;

          filesSection.appendChild(projectElement);
          projectElement.appendChild(pictureElement);
          projectElement.appendChild(nameElement);
        }
        function addProjectModal(data) {
          const filesSectionMod = document.querySelector(".sheets-modal");
          const cardElement = document.createElement("article");

          const legendCard = document.createElement("p");
          legendCard.innerText = "éditer";
          const pictureCard = document.createElement("img");
          pictureCard.src = data.imageUrl;
          const deleteCard = document.createElement("button");
          deleteCard.classList.add("buttonBin");

          const icon = document.createElement("i");
          icon.classList.add("fa-solid", "fa-trash-can");

          filesSectionMod.appendChild(cardElement);
          cardElement.appendChild(pictureCard);
          cardElement.appendChild(legendCard);
          cardElement.appendChild(deleteCard);
          deleteCard.appendChild(icon);
        }
        addProjectModal(data);
        addProjectWork(data);
        closeModal2();
        openModal1();
      })
      .catch((error) => {});
  }
});
