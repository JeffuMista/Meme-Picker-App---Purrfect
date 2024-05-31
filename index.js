import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const gifsOptionOnly = document.getElementById("gifs-option-only");
const getImageBtn = document.getElementById("get-image-btn");
const modal = document.getElementById("modal");
const modalInner = document.getElementById("modal-inner");
const modalCloseBtn = document.getElementById("modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedRadio);
modalCloseBtn.addEventListener("click", closeModal);
getImageBtn.addEventListener("click", renderCatImage);

function renderCatImage() {
  const catImage = getSingleCatImage();
  modalInner.innerHTML = `
  <img 
  class="cat-img"
  src=${catImage.image}
  alt=${catImage.alt}>`;
  modal.style.display = "flex";
}

function getSingleCatImage() {
  const catsImagesArray = getMatchingCatsArray();
  console.log(catsImagesArray);
  if (catsImagesArray.length === 1) {
    return catsImagesArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsImagesArray.length);
    console.log(randomNumber);
    return catsImagesArray[randomNumber];
  }
}

function getMatchingCatsArray() {
  const currentInput = document.querySelector('input[type="radio"]:checked');
  if (currentInput) {
    const selectedEmotion = currentInput.value;
    const isGif = gifsOptionOnly.checked;
    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

function closeModal() {
  modal.style.display = "none";
}

function highlightCheckedRadio(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags)
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
  }
  return emotionsArray;
}

function renderEmotionRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
    <div class='radio'>
      <label for="${emotion}">${emotion}</label>
      <input 
      type="radio"
      id="${emotion}"
      value="${emotion}"
      name="emotions"
      >
    </div>
    `;
  }
  emotionRadios.innerHTML = radioItems;
}
renderEmotionRadios(catsData);
